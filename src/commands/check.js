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

// get metadata about NPM packages using npm view command
async function getTemplateMetadata(packageName) {
    // Exec output contains both stderr and stdout outputs
    return exec(`npm view ${packageName} --json`).stdout
}

// run checks on NPM package
async function check(packageUrl) {
    // parse package URL input for package name
    var p_url = new URL(packageUrl)
    var p_url_path = p_url.pathname
    var packageName = p_url_path.split('package/')[1]
    // get metadata using package name and convert to JSON object
    var templateMetadata = await getTemplateMetadata(packageName)
    var templateJSON = JSON.parse(templateMetadata)
    // run all checks on metadata JSON object
    await runChecks(templateJSON)
}

module.exports = check
