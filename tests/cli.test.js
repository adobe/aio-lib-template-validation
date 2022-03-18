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

const { describe, it, expect } = require('@jest/globals')
const { join } = require('path')
const pkgDir = require('pkg-dir')
const { execFile } = require('child_process')

const packageRootDirectory = pkgDir.sync(__dirname)

function runCli(argArray) {
    return new Promise((resolve) => {
        const child = execFile(
            'node',
            [join(packageRootDirectory, 'src', 'index.js'), ...argArray],
            (error, stdout, stderr) => {
                resolve({
                    exitCode: child.exitCode,
                    error,
                    stdout,
                    stderr,
                })
            }
        )
    })
}

describe(`cli`, function () {
    it('exits with code 1 on failure', async () => {
        const result = await runCli([
            'run-checks',
            'https://www.npmjs.com/package/@bundle-validator/cli',
        ])
        expect(result.exitCode).toEqual(1)
    })

    it('exits with code 0 on success', async () => {
        const result = await runCli([
            'run-checks',
            'https://www.npmjs.com/package/@adobe/generator-app-asset-compute',
        ])
        expect(result.exitCode).toEqual(0)
    })

    it('exits with code 0 on success', async () => {
        const result = await runCli([
            'run-checks',
            'https://www.npmjs.com/package/@adobe/generator-app-excshell',
        ])
        expect(result.exitCode).toEqual(0)
    })
})
