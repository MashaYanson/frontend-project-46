#!/usr/bin/env node
import { Command } from 'commander';
const program = new Command();
import gendiff from '../src/diff.js'

program
    .version('0.1.0')
    .usage("[options] <filepath1> <filepath2>")
    .option('-V, --version', 'output the version number')
    .arguments('<filepath1> <filepath2>')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format <type>', 'output format')
    .action(gendiff)
    .parse()
