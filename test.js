#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class TestRunner {
  constructor() {
    this.totalTests = 0;
    this.passedTests = 0;
    this.failedTests = 0;
    this.startTime = null;
  }

  async runTests(problemName) {
    console.log(chalk.cyan('\n═══════════════════════════════════════════'));
    console.log(chalk.cyan.bold(`  Running tests for: ${problemName}`));
    console.log(chalk.cyan('═══════════════════════════════════════════\n'));

    try {
      // Find the problem file
      const problemPath = await this.findProblem(problemName);
      if (!problemPath) {
        console.log(chalk.red(`❌ Problem "${problemName}" not found!`));
        this.printAvailableProblems();
        return;
      }

      // Load problem and solution
      const problem = await import(problemPath);
      const solutionInfo = this.findSolutionFile(problemName);

      if (!solutionInfo) {
        const funcName = problem.functionName || 'solution';
        console.log(chalk.yellow(`📝 Solution file not found: solutions/${problemName}.js or .ts`));
        console.log(chalk.gray('\nCreate your solution file (JS or TS):\n'));
        console.log(chalk.white(`  // solutions/${problemName}.js`));
        console.log(chalk.white(`  export function ${funcName}(...args) { }`));
        console.log('');
        console.log(chalk.white(`  // solutions/${problemName}.ts`));
        console.log(chalk.white(`  export function ${funcName}(...args: any[]): any { }`));
        return;
      }

      const solution = await this.importSolution(solutionInfo);
      const functionName = problem.functionName || 'solution';
      const solutionFunc = solution[functionName] || solution.default;

      if (!solutionFunc) {
        console.log(chalk.red(`❌ Function "${functionName}" not found in solution file!`));
        return;
      }

      // Run tests
      this.startTime = Date.now();
      for (let i = 0; i < problem.tests.length; i++) {
        const test = problem.tests[i];
        await this.runSingleTest(solutionFunc, test, i + 1);
      }

      // Print summary
      this.printSummary();

    } catch (error) {
      console.log(chalk.red(`\n❌ Error: ${error.message}`));
      console.log(chalk.gray(error.stack));
    }
  }

  async runSingleTest(func, test, testNumber) {
    this.totalTests++;

    try {
      const startTime = performance.now();
      const result = await func(...test.input);
      const endTime = performance.now();
      const runtime = (endTime - startTime).toFixed(2);

      if (this.deepEqual(result, test.expected)) {
        this.passedTests++;
        console.log(chalk.green(`✓ Test ${testNumber}: PASS`) + chalk.gray(` (${runtime}ms)`));
      } else {
        this.failedTests++;
        console.log(chalk.red(`✗ Test ${testNumber}: FAIL`));
        console.log(chalk.gray(`  Input:    ${JSON.stringify(test.input)}`));
        console.log(chalk.gray(`  Expected: ${JSON.stringify(test.expected)}`));
        console.log(chalk.gray(`  Got:      ${JSON.stringify(result)}`));
      }
    } catch (error) {
      this.failedTests++;
      console.log(chalk.red(`✗ Test ${testNumber}: ERROR`));
      console.log(chalk.gray(`  ${error.message}`));
    }
  }

  deepEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (!this.deepEqual(a[i], b[i])) return false;
      }
      return true;
    }
    if (typeof a === 'object' && typeof b === 'object') {
      const keysA = Object.keys(a);
      const keysB = Object.keys(b);
      if (keysA.length !== keysB.length) return false;
      for (const key of keysA) {
        if (!this.deepEqual(a[key], b[key])) return false;
      }
      return true;
    }
    return false;
  }

  findSolutionFile(problemName) {
    const dir = path.join(__dirname, 'solutions');
    const tsPath = path.join(dir, `${problemName}.ts`);
    const jsPath = path.join(dir, `${problemName}.js`);
    if (fs.existsSync(tsPath)) return { path: tsPath, isTypeScript: true };
    if (fs.existsSync(jsPath)) return { path: jsPath, isTypeScript: false };
    return null;
  }

  async importSolution(solutionInfo) {
    if (solutionInfo.isTypeScript) {
      try {
        const { tsImport } = await import('tsx/esm/api');
        return tsImport(solutionInfo.path, import.meta.url);
      } catch (err) {
        if (err.code === 'ERR_MODULE_NOT_FOUND' || err.code === 'MODULE_NOT_FOUND') {
          console.log(chalk.red('❌ tsx package required for .ts solutions. Run: npm install'));
          process.exit(1);
        }
        throw err;
      }
    }
    return import(solutionInfo.path);
  }

  async findProblem(problemName) {
    const problemsDir = path.join(__dirname, 'problems');
    const categories = fs.readdirSync(problemsDir);

    for (const category of categories) {
      const categoryPath = path.join(problemsDir, category);
      if (!fs.statSync(categoryPath).isDirectory()) continue;

      const problemFile = path.join(categoryPath, `${problemName}.js`);
      if (fs.existsSync(problemFile)) {
        return problemFile;
      }
    }
    return null;
  }

  printAvailableProblems() {
    console.log(chalk.yellow('\n📚 Available problems:'));
    const problemsDir = path.join(__dirname, 'problems');
    const categories = fs.readdirSync(problemsDir).sort();

    for (const category of categories) {
      const categoryPath = path.join(problemsDir, category);
      if (!fs.statSync(categoryPath).isDirectory()) continue;

      const files = fs.readdirSync(categoryPath)
        .filter(f => f.endsWith('.js'))
        .map(f => f.replace('.js', ''));

      if (files.length > 0) {
        console.log(chalk.cyan(`\n  ${category}:`));
        files.forEach(file => {
          console.log(chalk.white(`    - ${file}`));
        });
      }
    }
  }

  printSummary() {
    const totalTime = Date.now() - this.startTime;
    console.log(chalk.cyan('\n═══════════════════════════════════════════'));

    if (this.failedTests === 0) {
      console.log(chalk.green.bold(`  🎉 All tests passed! (${this.passedTests}/${this.totalTests})`));
    } else {
      console.log(chalk.yellow(`  Tests: ${this.passedTests} passed, ${this.failedTests} failed`));
    }

    console.log(chalk.gray(`  Time: ${totalTime}ms`));
    console.log(chalk.cyan('═══════════════════════════════════════════\n'));
  }
}

// Main execution
const runner = new TestRunner();
const problemName = process.argv[2];

if (!problemName) {
  console.log(chalk.yellow('Usage: node test.js <problem-name>'));
  console.log(chalk.gray('Example: node test.js two-sum'));
  runner.printAvailableProblems();
} else {
  runner.runTests(problemName);
}