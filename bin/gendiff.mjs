#!/usr/bin/env node
import { Command } from 'commander';
const program = new Command();
import gendiff from '../src/getFormat.js'

program
    .version('0.1.0')
    .usage("[options] <filepath1> <filepath2>")
    .arguments('<filepath1> <filepath2>')
    .option('-V, --version', 'output the version number')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format <type>', 'output format','stylish')
    .action(gendiff)
    .parse()
