#!/usr/bin/env tsx
/**
 * Interactive CLI for browsing and running interview practice problems.
 * Usage: npm run practice
 */

import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import { execSync } from 'child_process';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Problem {
  name: string;
  category: string;
  dir: string;
  readmePath: string;
  testPath: string;
}

// ─── Discovery ───────────────────────────────────────────────────────────────

function discoverProblems(): Problem[] {
  const problemsDir = path.join(__dirname, 'problems');
  const problems: Problem[] = [];

  const categories = fs
    .readdirSync(problemsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const category of categories) {
    const categoryDir = path.join(problemsDir, category);
    const entries = fs
      .readdirSync(categoryDir, { withFileTypes: true })
      .filter((d) => d.isDirectory());

    for (const entry of entries) {
      const dir = path.join(categoryDir, entry.name);
      const readmePath = path.join(dir, 'README.md');
      const testPath = path.join(dir, `${entry.name}.test.ts`);

      if (fs.existsSync(readmePath)) {
        problems.push({
          name: entry.name,
          category,
          dir,
          readmePath,
          testPath: fs.existsSync(testPath) ? testPath : '',
        });
      }
    }
  }

  return problems;
}

// ─── Display ─────────────────────────────────────────────────────────────────

function clearScreen(): void {
  process.stdout.write('\x1Bc');
}

function printHeader(): void {
  console.log('');
  console.log('  ╔══════════════════════════════════════════════╗');
  console.log('  ║        JS Interview Practice                 ║');
  console.log('  ║   Real-world problems for full-stack devs    ║');
  console.log('  ╚══════════════════════════════════════════════╝');
  console.log('');
}

function printProblems(problems: Problem[]): void {
  const categories = ['easy', 'medium', 'real-world', 'debugging', 'refactoring'];
  const categoryLabels: Record<string, string> = {
    easy: '  [ EASY ]',
    medium: '  [ MEDIUM ]',
    'real-world': '  [ REAL-WORLD ]',
    debugging: '  [ DEBUGGING ]',
    refactoring: '  [ REFACTORING ]',
  };

  let index = 1;
  const indexed: Array<{ index: number; problem: Problem }> = [];

  for (const cat of categories) {
    const catProblems = problems.filter((p) => p.category === cat);
    if (catProblems.length === 0) continue;

    console.log(`\n${categoryLabels[cat] ?? `  [ ${cat.toUpperCase()} ]`}`);
    console.log('  ' + '─'.repeat(44));

    for (const problem of catProblems) {
      console.log(`  ${String(index).padStart(2, ' ')}. ${problem.name}`);
      indexed.push({ index, problem });
      index++;
    }
  }

  console.log('');
  return;
}

function printReadme(readmePath: string): void {
  const content = fs.readFileSync(readmePath, 'utf-8');
  console.log('');
  console.log('─'.repeat(60));
  console.log(content);
  console.log('─'.repeat(60));
}

// ─── Interaction ──────────────────────────────────────────────────────────────

function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function runProblemMenu(problem: Problem): Promise<void> {
  clearScreen();
  printHeader();
  console.log(`  Problem: ${problem.name}  |  Category: ${problem.category}`);
  console.log('');
  console.log('  Options:');
  console.log('    [r] Read README');
  console.log('    [t] Run tests');
  console.log('    [o] Open starter.ts in editor');
  console.log('    [b] Back to list');
  console.log('');

  const choice = await prompt('  > ');

  switch (choice.toLowerCase()) {
    case 'r':
      clearScreen();
      printReadme(problem.readmePath);
      await prompt('\n  Press Enter to continue...');
      await runProblemMenu(problem);
      break;

    case 't':
      if (!problem.testPath) {
        console.log('\n  No test file found for this problem.');
      } else {
        console.log(`\n  Running: npx vitest run ${problem.testPath}\n`);
        try {
          execSync(`npx vitest run "${problem.testPath}"`, { stdio: 'inherit' });
        } catch {
          // vitest exits with non-zero on failures — that's expected
        }
      }
      await prompt('\n  Press Enter to continue...');
      await runProblemMenu(problem);
      break;

    case 'o': {
      const starterPath = path.join(problem.dir, 'starter.ts');
      const editor = process.env['EDITOR'] ?? 'code';
      try {
        execSync(`${editor} "${starterPath}"`, { stdio: 'ignore' });
        console.log(`\n  Opened ${starterPath}`);
      } catch {
        console.log(`\n  Could not open editor. File is at:\n  ${starterPath}`);
      }
      await prompt('\n  Press Enter to continue...');
      await runProblemMenu(problem);
      break;
    }

    case 'b':
      return;

    default:
      await runProblemMenu(problem);
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const problems = discoverProblems();

  if (problems.length === 0) {
    console.log('No problems found. Make sure you have problems/ folder set up correctly.');
    process.exit(1);
  }

  while (true) {
    clearScreen();
    printHeader();
    printProblems(problems);

    console.log('  Enter a problem number to open it, or [q] to quit.\n');
    const input = await prompt('  > ');

    if (input.toLowerCase() === 'q') {
      console.log('\n  Good luck with your prep!\n');
      process.exit(0);
    }

    const num = parseInt(input, 10);
    const indexed = problems.flatMap((p, i) => ({ index: i + 1, problem: p }));
    const selected = indexed.find((x) => x.index === num);

    if (!selected) {
      console.log('\n  Invalid selection. Press Enter to continue...');
      await prompt('');
      continue;
    }

    await runProblemMenu(selected.problem);
  }
}

main().catch((err: unknown) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
