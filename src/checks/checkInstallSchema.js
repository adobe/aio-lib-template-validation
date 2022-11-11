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

const LibConfigurationHandler = require('@adobe/aio-lib-console-project-installation/src/lib/configuration-handler')

/**
 * Check that install.yaml file has correct structure
 *
 * @param {string} path Path to install.yaml file
 * @returns {Promise<{message: string, status: string}>} Check result
 */
async function checkInstallSchema (path) {
  const res = LibConfigurationHandler.load(path)
  const { valid: configIsValid, errors: configErrors } = LibConfigurationHandler.validate(res.values, true)
  if (!configIsValid) {
    const filteredErrors = []
    for (const configError of configErrors) {
      const filteredError = {
        ...configError.error && { message: configError.error },
        ...configError.suggestion && { suggestion: configError.suggestion }
      }
      filteredErrors.push(filteredError)
    }
    return {
      errors: filteredErrors,
      status: 'fail'
    }
  }
  return {
    status: 'pass'
  }
}

module.exports = {
  method: checkInstallSchema,
  description: 'Validation of install.yaml file'
}
