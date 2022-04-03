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

const exec = require('sync-exec')

// get metadata about NPM packages using npm view command
async function getTemplateMetadata(packageName) {
    // Exec output contains both stderr and stdout outputs
    return exec(`npm view ${packageName} --json`).stdout
}

function getChecks() {
    // import individual checks
    const checkNodeVersion = require('../checks/checkNodeVersion')
    const descriptionNotEmpty = require('../checks/descriptionNotEmpty')
    const containsKeyword = require('../checks/containsKeyword')
    return [checkNodeVersion, descriptionNotEmpty, containsKeyword]
}

function outputResults(results, outputInJson) {
    if (outputInJson === true) {
        results.stats.failures !== 0
            ? console.error(JSON.stringify(results, null, 4))
            : console.log(JSON.stringify(results, null, 4))
    } else {
        if (results.stats.failures !== 0) {
            console.error(
                `${results.stats.failures} of ${results.stats.tests} tests failed.`
            )
            console.error('Failed tests:')
            let i = 1
            for (const test of results.failures) {
                console.error(` ${i++}) ${test.description}`)
                console.error(`    Error: ${test.message}`)
            }
            console.error('Passed tests:')
            i = 1
            for (const test of results.passes) {
                console.error(` ${i++}) ${test.description}`)
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

// run checks on NPM package
async function check(packageUrl, options) {
    let outputInJson = options.json
    // parse package URL input for package name
    let p_url = new URL(packageUrl)
    let packageName = p_url.pathname.split('package/')[1]
    // get metadata using package name and convert to JSON object
    let templateMetadata = await getTemplateMetadata(packageName)
    let templateJSON = JSON.parse(templateMetadata)
    let results = {
        stats: {
            tests: 0,
            passes: 0,
            failures: 0,
        },
        passes: [],
        failures: [],
    }
    // run all checks on metadata JSON object
    const checks = getChecks()
    for (const check of checks) {
        let result = await check.method(templateJSON)
        results.stats.tests++
        result = { ...{ description: check.description }, ...result }
        if (result.status === 'fail') {
            results.stats.failures++
            results.failures.push(result)
        } else {
            results.stats.passes++
            results.passes.push(result)
        }
    }
    process.exitCode = results.stats.failures !== 0 ? 1 : 0
    outputResults(results, outputInJson)
}

module.exports = check
