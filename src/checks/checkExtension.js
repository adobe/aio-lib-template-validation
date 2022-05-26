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
 * Check that: if the "extension" property is specified in the install.yml file, it is an object containing the "serviceCode" key.
 *
 * @param {object} fileData
 * @returns {Promise<{message: string, status: string}>}
 */
async function checkExtension(fileData) {
    // "extension" is an optional property
    if (fileData.extension &&
        (fileData.extension.constructor.name !== 'Object' ||
            !fileData.extension.serviceCode)
    ) {
        return {
            message: '"extension" must provide the "serviceCode" key.',
            status: 'fail',
        };
    }
    return {
        message: '',
        status: 'pass',
    };
}

module.exports = {
    method: checkExtension,
    description: 'Validation of the "extension" property in install.yml',
};
