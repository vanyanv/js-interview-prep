import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const problemsDir = path.join(process.cwd(), 'problems');
    
    if (!fs.existsSync(problemsDir)) {
      return NextResponse.json({ error: 'Problems directory not found' }, { status: 404 });
    }

    const categories = fs.readdirSync(problemsDir)
      .filter(file => {
        const filePath = path.join(problemsDir, file);
        return fs.statSync(filePath).isDirectory();
      })
      .sort();

    const problems = categories.map(category => {
      const categoryPath = path.join(problemsDir, category);
      const files = fs.readdirSync(categoryPath)
        .filter(f => f.endsWith('.js'))
        .map(f => f.replace('.js', ''));
      
      return {
        category,
        problems: files
      };
    });

    return NextResponse.json(problems);
  } catch (error) {
    console.error('Error reading problems:', error);
    return NextResponse.json({ error: 'Failed to fetch problems' }, { status: 500 });
  }
}
