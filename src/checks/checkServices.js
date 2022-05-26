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
 * Check that "services" is an array of objects containing the "code" key
 *
 * @param {object} fileData
 * @returns {Promise<{message: string, status: string}>}
 */
async function checkServices(fileData) {
    // "services" is an optional property
    // "services" is an array of objects containing the "code" key
    if (fileData.apis &&
        (!Array.isArray(fileData.apis) || !areServicesValid(fileData.apis))
    ) {
        return {
            message:
                '"apis" must be an array of objects containing the "code" key',
            status: 'fail',
        };
    }
    return {
        message: '',
        status: 'pass',
    };
}

/**
 * @param {array} services
 * @returns {boolean}
 */
function areServicesValid(services) {
    for (const service of services) {
        if (service.constructor.name !== 'Object' || !service.code) {
            return false;
        }
    }
    return true;
}

module.exports = {
    method: checkServices,
    description: 'Validation of the "apis" property in install.yml',
};
