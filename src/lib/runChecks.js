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

const Mocha = require('mocha')
const { logger } = require('./logger')

const checkNodeVersion = require('../checks/checkNodeVersion')
const descriptionNotEmpty = require('../checks/descriptionNotEmpty')
const containsKeyword = require('../checks/containsKeyword')

const checks = [descriptionNotEmpty, containsKeyword, checkNodeVersion]

async function runChecks(metadataJSON) {
    const mocha = new Mocha({
        reporter: 'spec',
    })
    const suite = new Mocha.Suite('Validating App Builder templates')
    suite.timeout(0)
    for (let check of checks) {
        suite.addTest(
            new Mocha.Test(check.description, async function () {
                const result = await check.method(metadataJSON)
                if (result.status === 'pass') {
                    return true
                }
                throw new Error(result.message)
            })
        )
    }
    mocha.suite.addSuite(suite)
    await new Promise((resolve) => {
        mocha.run((failures) => {
            if (failures) {
                logger.error(`${failures} failures found. See report.`)
                process.exitCode = 1
                resolve()
            }
            resolve()
        })
    })
}

module.exports = runChecks
