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

// const array specifies accepted versions of NodeJS
// can specify major/minor versions, ex: 14, 14.13, 16.34.02
const VERSIONS = [14, 16]

async function checkNodeVersion(metadataJSON) {
    if (!metadataJSON) {
        return {
            message: 'Error: metadataJSON is null',
            status: 'fail',
        }
    }
    if ('_nodeVersion' in metadataJSON) {
        let nodeVersion = metadataJSON._nodeVersion
        // for each accepted version, make regex and check if node version in metadata matches one
        for (let version of VERSIONS) {
            let regex = new RegExp(`^${version}(.[0-9]d*)*`)
            if (regex.test(nodeVersion)) {
                return {
                    message: '',
                    status: 'pass',
                }
            }
        }
        return {
            message: `Node version of NPM package is ${nodeVersion}, which is not ^14 or ^16.`,
            status: 'fail',
        }
    }
    return {
        message: 'Metadata input missing node version',
        status: 'fail',
    }
}

module.exports = {
    method: checkNodeVersion,
    description:
        'NPM package must run on all active LTS versions of NodeJS (^14 || ^16)',
}
