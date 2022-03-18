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

async function checkNodeVersion(metadataJSON) {
    if ('_nodeVersion' in metadataJSON) {
        var nodeVersion = metadataJSON._nodeVersion
        const regex14 = new RegExp('^14(.[0-9]d*)*')
        const regex16 = new RegExp('^16(.[0-9]d*)*')
        if (regex14.test(nodeVersion) || regex16.test(nodeVersion)) {
            return {
                message: '',
                status: 'pass',
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
