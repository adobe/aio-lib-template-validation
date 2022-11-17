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
const Ajv = require('ajv')
const fs = require('fs')
/**
 * Check that packages.json file has correct structure
 *
 * @param {string} path Path to package.json schema
 * @returns {Promise<{message: string, status: string}>} Check result
 */
async function checkPackageSchema (path) {
  const file = fs.readFileSync(path, 'utf8')
  const packageJson = JSON.parse(file)
  const schema = require('./schema/package.schema.json')
  const ajv = new Ajv({ allErrors: true })
  require('ajv-errors')(ajv)
  const validate = ajv.compile(schema)
  const valid = validate(packageJson)
  if (!valid) {
    const filteredErrors = []
    for (const configError of validate.errors) {
      const filteredError = {
        ...configError.message && { message: configError.message }
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
  method: checkPackageSchema,
  description: 'Validation of packages.json file'
}
