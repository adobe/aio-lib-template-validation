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

var exec = require('sync-exec')
const runChecks = require('../lib/runChecks')

async function getTemplateMetadata(packageName) {
    // Exec output contains both stderr and stdout outputs
    return exec(`npm view ${packageName} --json`).stdout
}

async function check(packageUrl) {
    var p_url = new URL(packageUrl)
    var p_url_path = p_url.pathname
    var packageName = p_url_path.split('package/')[1]
    var templateMetadata = await getTemplateMetadata(packageName)
    var templateJSON = JSON.parse(templateMetadata)
    await runChecks(templateJSON)
}

module.exports = check
