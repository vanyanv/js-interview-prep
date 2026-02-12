import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// In-memory storage for Vercel/Serverless environment (temporary until Database phase)
// Note: This will reset when the serverless function cold starts or redeploys.
let memoryProgress: Record<string, any> = {};

// Helper to get progress safely
function getProgress() {
  // Try to load from file if existing (local dev), otherwise use memory
  try {
    const progressFile = path.join(process.cwd(), '..', 'user_progress.json'); // Adjust path if needed
    if (fs.existsSync(progressFile)) {
       const data = fs.readFileSync(progressFile, 'utf-8');
       return { ...memoryProgress, ...JSON.parse(data) };
    }
  } catch (e) {
    // Ignore file errors in Vercel
  }
  return memoryProgress;
}

export async function GET() {
  const currentProgress = getProgress();
  return NextResponse.json(currentProgress);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { problemId, status } = body; 

    // Update memory
    memoryProgress[problemId] = status;

    // Try to save to file (works in local dev, ignored in Vercel)
    const progressFile = path.join(process.cwd(), '..', 'user_progress.json');
    try {
        // Only write if we can resolve the file path relative to CWD in a way that makes sense
        // In Vercel, this might throw or simply be readonly.
        if (fs.existsSync(path.dirname(progressFile))) {
             let fileData = {};
             if (fs.existsSync(progressFile)) {
                 fileData = JSON.parse(fs.readFileSync(progressFile, 'utf-8'));
             }
             const newData = { ...fileData, ...memoryProgress };
             fs.writeFileSync(progressFile, JSON.stringify(newData, null, 2));
        }
    } catch (e) {
        // Silently fail on file write in production
        console.warn('Could not persist progress to file (expected in Vercel):', e);
    }

    return NextResponse.json({ success: true, progress: memoryProgress });
  } catch (error) {
    console.error('Progress API Error:', error);
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 });
  }
}
