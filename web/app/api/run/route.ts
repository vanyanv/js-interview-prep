import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

export async function POST(request: Request) {
  try {
    const { code, problemName, language } = await request.json();

    if (!code || !problemName) {
      return NextResponse.json({ error: 'Missing code or problemName' }, { status: 400 });
    }

    const extension = language === 'typescript' ? 'ts' : 'js';
    const solutionsDir = path.join(process.cwd(), '..', 'solutions');
    
    // Ensure solutions directory exists
    if (!fs.existsSync(solutionsDir)) {
      fs.mkdirSync(solutionsDir, { recursive: true });
    }

    const filePath = path.join(solutionsDir, `${problemName}.${extension}`);
    fs.writeFileSync(filePath, code);

    // Run the test execution
    // Note: We need to run `node test.js` from the root directory
    const rootDir = path.join(process.cwd(), '..');
    const command = `node test.js ${problemName}`;

    try {
      const { stdout, stderr } = await execPromise(command, { cwd: rootDir });
      // Clean up stdout to remove escape codes for coloring if needed, 
      // but keeping them might be good for a terminal-like output in the frontend if we support it.
      // We will send raw output.
      return NextResponse.json({ stdout, stderr });
    } catch (execError: any) {
      // exec throws if the command exits with code != 0
      return NextResponse.json({ 
        stdout: execError.stdout || '', 
        stderr: execError.stderr || execError.message,
        isError: true
      });
    }

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
