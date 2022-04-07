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
 * Check that package.json contains required keywords
 *
 * @param fileData
 * @returns {Promise<{message: string, status: string}>}
 */
async function containsKeyword(fileData) {
    if (!fileData.keywords) {
        return {
            message: 'package.json must contain keywords',
            status: 'fail',
        };
    }
    const index = fileData.keywords.findIndex((element) => {
        if (element.includes('aio-app-builder-template')) {
            return true;
        }
    });
    if (index === -1) {
        return {
            message:
                'ecosystem:aio-app-builder-template must be one of the keywords in package.json',
            status: 'fail',
        };
    }
    return {
        message: '',
        status: 'pass',
    };
}

module.exports = {
    method: containsKeyword,
    description: 'package.json must contain a keyword "aio-app-builder-template"',
};
