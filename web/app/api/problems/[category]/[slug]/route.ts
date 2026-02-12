import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: Request, // eslint-disable-line @typescript-eslint/no-unused-vars
  { params }: { params: Promise<{ category: string; slug: string }> }
) {
  try {
    const { category, slug } = await params;
    const problemsDir = path.join(process.cwd(), '..', 'problems');
    const filePath = path.join(problemsDir, category, `${slug}.js`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Problem not found' }, { status: 404 });
    }

    const content = fs.readFileSync(filePath, 'utf-8');

    // Extract comment block (description)
    const commentMatch = content.match(/\/\*([\s\S]*?)\*\//);
    const description = commentMatch ? commentMatch[1].trim() : 'No description available.';

    // Extract function name
    const functionNameMatch = content.match(/export const functionName = '([^']+)';/);
    const functionName = functionNameMatch ? functionNameMatch[1] : 'solution';

    // Generate starter code
    const jsStarter = `export function ${functionName}(input) {
  // Your code here
  
}`;

    const tsStarter = `export function ${functionName}(input: any): any {
  // Your code here
  
}`;

    // Infer difficulty and category from description if possible
    const difficultyMatch = description.match(/Difficulty: (.+)/);
    const difficulty = difficultyMatch ? difficultyMatch[1].trim() : 'Unknown';

    return NextResponse.json({
      slug,
      category,
      functionName,
      description,
      difficulty,
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
