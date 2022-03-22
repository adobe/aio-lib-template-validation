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

async function containsKeyword(metadataJSON) {
    if ('keywords' in metadataJSON) {
        const index = metadataJSON.keywords.findIndex((element) => {
            if (element.includes('aio-app-builder-template')) {
                return true
            }
        })
        if (index != -1) {
            return {
                message: '',
                status: 'pass',
            }
        } else {
            return {
                message:
                    'ecosystem:aio-app-builder-template must be one of the keywords in the NPM package',
                status: 'fail',
            }
        }
    }
    return {
        message: 'Metadata input missing keywords',
        status: 'fail',
    }
}

module.exports = {
    method: containsKeyword,
    description: 'NPM package should have keyword "aio-app-builder-template"',
}
