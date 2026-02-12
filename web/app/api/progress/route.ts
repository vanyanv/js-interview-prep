import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const PROGRESS_FILE = path.join(process.cwd(), '..', 'user_progress.json');

export async function GET() {
  try {
    // Sync with solutions directory
    const solutionsDir = path.join(process.cwd(), '..', 'solutions');
    const problemsDir = path.join(process.cwd(), '..', 'problems');
    
    let currentProgress: Record<string, string> = {};
    if (fs.existsSync(PROGRESS_FILE)) {
      const data = fs.readFileSync(PROGRESS_FILE, 'utf-8');
      currentProgress = JSON.parse(data);
    }

    if (fs.existsSync(solutionsDir) && fs.existsSync(problemsDir)) {
      const solutionFiles = fs.readdirSync(solutionsDir);
      const categories = fs.readdirSync(problemsDir).filter(f => fs.statSync(path.join(problemsDir, f)).isDirectory());

      categories.forEach(category => {
        const categoryPath = path.join(problemsDir, category);
        const problemFiles = fs.readdirSync(categoryPath).filter(f => f.endsWith('.js'));

        problemFiles.forEach(problemFile => {
          const problemSlug = problemFile.replace('.js', '');
          // Check if solution exists (js or ts)
          const hasSolution = solutionFiles.some(s => 
            s === `${problemSlug}.js` || s === `${problemSlug}.ts`
          );

          if (hasSolution) {
            const progressKey = `${category}/${problemSlug}`;
            if (!currentProgress[progressKey]) {
              currentProgress[progressKey] = 'completed';
            }
          }
        });
      });
      
      // Save the synced progress
      fs.writeFileSync(PROGRESS_FILE, JSON.stringify(currentProgress, null, 2));
    }

    return NextResponse.json(currentProgress);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read progress' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { problemId, status } = body; // problemId e.g., "01-two-pointers/pair-with-targetsum"

    let currentProgress = {};
    if (fs.existsSync(PROGRESS_FILE)) {
      const data = fs.readFileSync(PROGRESS_FILE, 'utf-8');
      currentProgress = JSON.parse(data);
    }

    const updatedProgress = {
      ...currentProgress,
      [problemId]: status // "completed", "review", etc.
    };

    fs.writeFileSync(PROGRESS_FILE, JSON.stringify(updatedProgress, null, 2));

    return NextResponse.json({ success: true, progress: updatedProgress });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save progress' }, { status: 500 });
  }
}
