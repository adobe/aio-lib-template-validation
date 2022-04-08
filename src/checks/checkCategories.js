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
 * Check that template categories are listed in install.yml file
 *
 * @param {object} fileData
 * @returns {Promise<{message: string, status: string}>}
 */
async function checkCategories(fileData) {
    if (!fileData.categories) {
        return {
            message: 'install.yml must contain a list of categories',
            status: 'fail',
        };
    }
    return {
        message: '',
        status: 'pass',
    };
}

module.exports = {
    method: checkCategories,
    description: 'install.yml must contain a list of categories',
};
