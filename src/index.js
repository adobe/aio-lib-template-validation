#! /usr/bin/env node

const { program } = require('commander')
const check = require('./commands/check')

program
    .command('run-checks <packageUrl>')
    .description('Run all checks on App Builder template given NPM package URL')
    .action(check)

program.parseAsync().catch((e) => {
    console.error(e)
    process.exitCode = 1
})
