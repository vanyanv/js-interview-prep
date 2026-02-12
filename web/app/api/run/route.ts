import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { runTests, parseProblemDefinition } from '@/lib/testRunner';

export async function POST(request: Request) {
  try {
    const { code, problemName, category, language } = await request.json();

    if (!code || !problemName) {
      return NextResponse.json({ error: 'Missing code or problemName' }, { status: 400 });
    }

    // In Vercel, process.cwd() is the project root. 
    // Since we are inside the 'web' project (if deployed as such) or monorepo.
    // We moved 'problems' to 'web/problems'.
    // If running 'next dev' from 'web', cwd is 'web'.
    // If running 'next start' from 'web', cwd is 'web'.
    const problemsDir = path.join(process.cwd(), 'problems');
    
    // We need to find the problem file.
    // If category is provided, use it. Otherwise we might need to search (legacy support).
    let problemPath = '';
    
    if (category) {
      problemPath = path.join(problemsDir, category, `${problemName}.js`);
    } else {
       // Fallback: search in all categories (inefficient but backward compatible if needed)
       // But we updated the frontend to send category, so this should not be needed often.
       if (fs.existsSync(problemsDir)) {
          const categories = fs.readdirSync(problemsDir);
          for (const cat of categories) {
             const attempt = path.join(problemsDir, cat, `${problemName}.js`);
             if (fs.existsSync(attempt)) {
                problemPath = attempt;
                break;
             }
          }
       }
    }

    if (!problemPath || !fs.existsSync(problemPath)) {
      return NextResponse.json({ error: 'Problem definition not found' }, { status: 404 });
    }

    const problemContent = fs.readFileSync(problemPath, 'utf-8');
    const problems = parseProblemDefinition(problemContent);

    const result = await runTests(code, language, problems);

    return NextResponse.json({
      stdout: result.consoleOutput.join('\n') + (result.isError ? `\nError: ${result.message}` : ''),
      stderr: result.isError ? result.message : '',
      results: result.results,
      passed: result.passedTests === result.totalTests,
      totalTests: result.totalTests,
      passedTests: result.passedTests
    });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
