#!/usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import { GitignoreGenerator } from './generator.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

program
  .name('gitignore-gen')
  .description('⚡ Auto-generate .gitignore based on project type')
  .version('1.0.0')
  .option('-d, --detect', 'Auto-detect project type', true)
  .option('-t, --type <type>', 'Specify project type manually')
  .option('-o, --output <path>', 'Output file path (default: .gitignore)')
  .action(async (options) => {
    try {
      const generator = new GitignoreGenerator();
      const cwd = process.cwd();
      
      let projectType = options.type;
      
      if (!projectType && options.detect) {
        console.log(chalk.blue('🔍 Detecting project type...'));
        projectType = await generator.detectProjectType(cwd);
        console.log(chalk.green(`✓ Detected: ${projectType}`));
      }
      
      if (!projectType) {
        console.error(chalk.red('❌ Could not detect project type. Use -t to specify manually.'));
        process.exit(1);
      }
      
      const outputPath = options.output || '.gitignore';
      await generator.generate(projectType, path.join(cwd, outputPath));
      
      console.log(chalk.green(`✅ Generated ${outputPath} for ${projectType}!`));
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

program.parse();
