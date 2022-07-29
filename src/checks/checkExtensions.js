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
 * Check that: if the "extensions" property is specified in the install.yml file, it is an array containing objects. Each object has the "extensionPointId" key.
 *
 * @param {object} fileData
 * @returns {Promise<{message: string, status: string}>}
 */
async function checkExtensions(fileData) {
    // "extensions" is an optional property

    if (fileData.extensions) {
        if (!Array.isArray(fileData.extensions)) {
            return {
                message: '"extensions" must be an Array.',
                status: 'fail',
            };
        } else {
            let error = null;

            if (fileData.extensions.length === 0) {
                error = 'extensions array cannot be empty';
            }

            for (let ext of fileData.extensions) {
                if (!(typeof ext === 'object') || Array.isArray(ext)) {
                    error = 'extension item is not an object';
                    break;
                }

                if (typeof ext.extensionPointId !== 'string') {
                    error = 'extension item does not have the string property "extensionPointId"';
                    break;
                }
            }

            if (error) {
                return {
                    message: error,
                    status: 'fail',
                };
            }
        }
    }
    return {
        message: '',
        status: 'pass',
    };
}

module.exports = {
    method: checkExtensions,
    description: 'Validation of the "extensions" property in install.yml',
};
