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

// import individual checks
const checkNodeVersion = require('../checks/checkNodeVersion')
const descriptionNotEmpty = require('../checks/descriptionNotEmpty')
const containsKeyword = require('../checks/containsKeyword')

// array of checks that need to be run on metadata
const checks = [descriptionNotEmpty, containsKeyword, checkNodeVersion]

// get metadata about NPM packages using npm view command
async function getTemplateMetadata(packageName) {
    // Exec output contains both stderr and stdout outputs
    let templateMetadata = await exec(`npm view ${packageName} --json`).stdout
    try {
        return JSON.parse(templateMetadata)
    } catch (e) {
        let error = `Error fatching metadata for ${packageName}`
        console.error(error)
        throw new Error(error)
    }
}

// run checks on NPM package
async function checkTemplateMetadata(packageName) {
    let templateMetadata = await getTemplateMetadata(packageName)
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
    for (const check of checks) {
        let result = await check.method(templateMetadata)
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
    return results
}

module.exports = {
    getTemplateMetadata,
    checkTemplateMetadata,
}
