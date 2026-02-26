#!/usr/bin/env tsx
/**
 * Generates Vitest test files from existing problem definitions.
 *
 * Scans `problems/<category>/*.js` and `real-world-scenarios/<difficulty>/*.js`,
 * then generates `__tests__/problems/<category>/<name>.test.ts` (or `__tests__/real-world/...`)
 * that import the problem's `functionName`/`tests` and the matching solution.
 *
 * Usage: npx tsx scripts/generate-vitest-tests.ts
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

interface SourceDir {
  sourceDir: string;
  outputBase: string;
  solutionsDir: string;
}

const sources: SourceDir[] = [
  {
    sourceDir: path.join(ROOT, 'problems'),
    outputBase: path.join(ROOT, '__tests__', 'problems'),
    solutionsDir: path.join(ROOT, 'solutions'),
  },
  {
    sourceDir: path.join(ROOT, 'real-world-scenarios'),
    outputBase: path.join(ROOT, '__tests__', 'real-world'),
    solutionsDir: path.join(ROOT, 'solutions'),
  },
];

let totalGenerated = 0;
let totalSkipped = 0;

for (const { sourceDir, outputBase, solutionsDir } of sources) {
  if (!fs.existsSync(sourceDir)) {
    console.log(`Skipping ${sourceDir} (not found)`);
    continue;
  }

  const categories = fs.readdirSync(sourceDir).filter((f) => {
    const full = path.join(sourceDir, f);
    return fs.statSync(full).isDirectory();
  });

  for (const category of categories) {
    const categoryPath = path.join(sourceDir, category);
    const problemFiles = fs.readdirSync(categoryPath).filter((f) => f.endsWith('.js'));

    if (problemFiles.length === 0) continue;

    const outDir = path.join(outputBase, category);
    fs.mkdirSync(outDir, { recursive: true });

    for (const file of problemFiles) {
      const problemName = file.replace('.js', '');

      // Compute relative paths from the output test file to the source files
      const relProblemPath = path.relative(outDir, path.join(categoryPath, file));

      // Check for solution: .ts first, then .js
      const tsSolution = path.join(solutionsDir, `${problemName}.ts`);
      const jsSolution = path.join(solutionsDir, `${problemName}.js`);
      let relSolutionPath: string | null = null;

      if (fs.existsSync(tsSolution)) {
        relSolutionPath = path.relative(outDir, tsSolution);
      } else if (fs.existsSync(jsSolution)) {
        relSolutionPath = path.relative(outDir, jsSolution);
      }

      const testContent = generateTestFile(
        problemName,
        relProblemPath,
        relSolutionPath,
        `${path.basename(sourceDir)}/${category}`,
      );

      const outFile = path.join(outDir, `${problemName}.test.ts`);
      fs.writeFileSync(outFile, testContent);
      totalGenerated++;
    }
  }
}

console.log(`Generated ${totalGenerated} test files (${totalSkipped} skipped)`);

function generateTestFile(
  problemName: string,
  relProblemPath: string,
  relSolutionPath: string | null,
  label: string,
): string {
  // Ensure paths use forward slashes and start with ./
  const normProblem = './' + relProblemPath.split(path.sep).join('/');
  const normSolution = relSolutionPath
    ? './' + relSolutionPath.split(path.sep).join('/')
    : null;

  const solutionImport = normSolution
    ? `
let solutionFn: ((...args: any[]) => any) | undefined;
try {
  const mod = await import('${normSolution}');
  solutionFn = mod[functionName] ?? mod.default;
} catch {
  // Solution not found — tests will be skipped
}`
    : `
const solutionFn = undefined;`;

  return `// Auto-generated from ${label}/${problemName}.js
// Re-run: npm run generate:tests
import { describe, it, expect } from 'vitest';
import { functionName, tests } from '${normProblem}';
${solutionImport}

describe('${problemName} [${label}]', () => {
  if (!solutionFn) {
    it.todo('solution not yet implemented');
    return;
  }

  const fn = solutionFn!;

  tests.forEach((testCase: { input: any[]; expected: any }, index: number) => {
    it(\`case \${index + 1}: (\${testCase.input.map((a: any) => JSON.stringify(a)).join(', ')}) => \${JSON.stringify(testCase.expected)}\`, () => {
      const result = fn(...testCase.input);
      expect(result).toEqual(testCase.expected);
    });
  });
});
`;
}
