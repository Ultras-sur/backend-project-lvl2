#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import path from 'path';
import compare from '../src/index.js';

const program = new Command();

program
  .description('Compares to configuration and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .version('0.0.1')
  .option('-f, --format [type]', 'output format(default: "stylish")')
  .action((filepath1, filepath2) => {
    const options = program.opts();
    compare(path.resolve(filepath1), path.resolve(filepath2), options.format);
  });

program.parse(process.argv);
