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
const checkInstallSchema = require('../checks/checkInstallSchema')
const checkPackageSchema = require('../checks/checkPackageSchema')

const filesToCheck = [
  {
    name: 'install.yml',
    check: checkInstallSchema
  },
  {
    name: 'package.json',
    check: checkPackageSchema
  }
]

/**
 * Run checks on template package
 *
 * @param {string} path Path to template's folder
 * @returns {Promise<{failures: *[], passes: *[], stats: {checks: number, failures: number, passes: number}}>} Check results
 */
async function checkTemplateMetadata (path) {
  const results = {
    stats: {
      checks: 0,
      passes: 0,
      failures: 0
    },
    passes: [],
    failures: []
  }

  for (const fileToCheck of filesToCheck) {
    try {
      let result = await fileToCheck.check.method(path + '/' + fileToCheck.name)
      results.stats.checks++
      result = { ...{ description: fileToCheck.check.description }, ...result }
      if (result.status === 'fail') {
        results.stats.failures++
        results.failures.push(result)
      } else {
        results.stats.passes++
        results.passes.push(result)
      }
    } catch (e) {
      results.stats.checks++
      results.stats.failures++
      results.failures.push({
        errors: [fileToCheck.name + ' file not found or is invalid'],
        status: 'fail',
        description:
                    fileToCheck.name + ' is required and must be valid'
      })
    }
  }
  return results
}

module.exports = {
  checkTemplateMetadata
}
