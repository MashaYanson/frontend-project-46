#!/usr/bin/env node
import { Command } from 'commander';
const program = new Command();
/* {
option:()=>...
parse:()=>...
} */
program
    .usage("[options]")
    .description('Compares two configuration files and shows a difference.')
    .option('-V, --version', 'output the version number')
    .parse()


console.log(program.opts())
