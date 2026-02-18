import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import vm from 'vm';

export async function GET(
  request: Request, // eslint-disable-line @typescript-eslint/no-unused-vars
  { params }: { params: Promise<{ category: string; slug: string }> }
) {
  try {
    const { category, slug } = await params;
    const problemsDir = path.join(process.cwd(), 'problems');
    const filePath = path.join(problemsDir, category, `${slug}.js`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Problem not found' }, { status: 404 });
    }

    const content = fs.readFileSync(filePath, 'utf-8');

    // Extract comment block (description)
    const commentMatch = content.match(/\/\*([\s\S]*?)\*\//);
    const description = commentMatch ? commentMatch[1].trim() : 'No description available.';

    // Parse tests and functionName from the problem file
    // IMPORTANT: Must use 'var' not 'const' — const declarations in vm.runInContext
    // don't become properties on the sandbox object in modern Node.js
    const sandbox: { tests: any[]; functionName: string; console: { log: () => void } } = {
      tests: [],
      functionName: 'solution',
      console: { log: () => {} },
    };

    const context = vm.createContext(sandbox);
    const executableCode = content
      .replace(/export\s+const\s+tests/g, 'var tests')
      .replace(/export\s+const\s+functionName/g, 'var functionName');

    vm.runInContext(executableCode, context);

    const functionName = sandbox.functionName;
    const tests = sandbox.tests;

    if (!tests || tests.length === 0) {
      return NextResponse.json({ error: 'No tests found in problem definition' }, { status: 500 });
    }

    // Generate starter code
    const jsStarter = `export function ${functionName}(input) {\n  // Your code here\n  \n}`;
    const tsStarter = `export function ${functionName}(input: any): any {\n  // Your code here\n  \n}`;

    // Infer difficulty from description
    const difficultyMatch = description.match(/Difficulty: (.+)/);
    const difficulty = difficultyMatch ? difficultyMatch[1].trim() : 'Unknown';

    return NextResponse.json({
      slug,
      category,
      functionName,
      description,
      difficulty,
      tests,
      starterCode: {
        javascript: jsStarter,
        typescript: tsStarter
      }
    });

  } catch (error) {
    console.error('Error fetching problem:', error);
    return NextResponse.json({ error: 'Failed to fetch problem details' }, { status: 500 });
  }
}
