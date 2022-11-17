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

const { checkTemplateMetadata } = require('../lib/templateMetadata')

/**
 * Outputs check results
 *
 * @param {object} results Results to output
 * @param {boolean} outputInJson JSON output
 */
function outputResults (results, outputInJson) {
  if (outputInJson === true) {
    console.log(JSON.stringify(results, null, 4))
  } else {
    if (results.stats.failures !== 0) {
      console.log(
                `${results.stats.failures} of ${results.stats.tests} tests failed.`
      )
      console.log('Failed tests:')
      let i = 1
      for (const test of results.failures) {
        console.log(` ${i++}) ${test.description}`)
        for (const error of test.errors) {
          console.log(`    Error: ${error.message}`)
          if (error.suggestion) {
            console.log(`    Suggestion: ${error.suggestion}`)
          }
        }
      }
      console.log('Passed tests:')
      i = 1
      for (const test of results.passes) {
        console.log(` ${i++}) ${test.description}`)
      }
    } else {
      console.log(
                `${results.stats.passes} of ${results.stats.tests} tests passed.`
      )
      console.log('Tests:')
      let i = 1
      for (const test of results.passes) {
        console.log(` ${i++}) ${test.description}`)
      }
    }
  }
}

/**
 * Run checks on template package
 *
 * @param {string} path Path to the template
 * @param {object} options Additional options
 * @returns {Promise<void>}
 */
async function check (path, options) {
  const outputInJson = options.json
  const results = await checkTemplateMetadata(path)
  process.exitCode = results.stats.failures !== 0 ? 1 : 0
  outputResults(results, outputInJson)
}

module.exports = check
