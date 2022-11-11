#!/usr/bin/env node

/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const { program } = require('commander')
const check = require('./commands/check')

program
  .command('run-checks <path>')
  .description(
    'Run all checks on App Builder template given a path to its code'
  )
  .action(check)
  .option('-j, --json', 'Output in JSON format', false)

program.parseAsync().catch((e) => {
  console.error(e)
  process.exitCode = 1
})
