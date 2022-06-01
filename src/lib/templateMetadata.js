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

const fs = require('fs');
const YAML = require('yaml');

// import individual checks
const descriptionNotEmpty = require('../checks/descriptionNotEmpty');
const containsKeyword = require('../checks/containsKeyword');
const checkCategories = require('../checks/checkCategories');
const checkExtension = require('../checks/checkExtension');
const checkServices = require('../checks/checkServices');
const checkEvent = require('../checks/checkEvent');
const checkRuntime = require('../checks/checkRuntime');

const filesToCheck = [
    {
        name: 'install.yml',
        parser: YAML,
        checks: [
            checkCategories, 
            checkExtension, 
            checkServices, 
            checkEvent, 
            checkRuntime
        ],
    },
    {
        name: 'package.json',
        parser: JSON,
        checks: [descriptionNotEmpty, containsKeyword],
    },
];

/**
 * Run checks on template package
 *
 * @param {string} path
 * @returns {Promise<{failures: *[], passes: *[], stats: {tests: number, failures: number, passes: number}}>}
 */
async function checkTemplateMetadata(path) {
    let results = {
        stats: {
            tests: 0,
            passes: 0,
            failures: 0,
        },
        passes: [],
        failures: [],
    };

    for (const fileToCheck of filesToCheck) {
        try {
            const file = fs.readFileSync(path + '/' + fileToCheck.name, 'utf8');
            const fileData = fileToCheck.parser.parse(file);
            for (const check of fileToCheck.checks) {
                let result = await check.method(fileData);
                results.stats.tests++;
                result = { ...{ description: check.description }, ...result };
                if (result.status === 'fail') {
                    results.stats.failures++;
                    results.failures.push(result);
                } else {
                    results.stats.passes++;
                    results.passes.push(result);
                }
            }
        } catch (e) {
            results.stats.tests++;
            results.stats.failures++;
            results.failures.push({
                message: fileToCheck.name + ' file not found or is invalid',
                status: 'fail',
                description:
                    fileToCheck.name + ' is required and must be valid',
            });
        }
    }
    return results;
}

module.exports = {
    checkTemplateMetadata,
};
