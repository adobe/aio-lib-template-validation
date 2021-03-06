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

/**
 * Check that: if the "runtime" property is specified in the install.yml file, it is a boolean value 
 * that specifies whether to add Runtime to App Builder application.
 * @param {object} fileData
 * @returns {Promise<{message: string, status: string}>}
 */
 async function checkRuntime(fileData) {
  // "runtime" is an optional property
  if (fileData.runtime && typeof fileData.runtime !== "boolean") {
      return {
          message: '"runtime" must be a boolean value',
          status: 'fail',
      };
  }
  return {
      message: '',
      status: 'pass',
  };
}

module.exports = {
  method: checkRuntime,
  description: 'Validation of the "runtime" property in install.yml',
};
