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
const checkNodeVersion = require('../src/checks/checkNodeVersion')

describe(`checks node version ^14 || ^16`, function () {
    it('returns status: pass', async () => {
        var vJSON = {
            _nodeVersion: '14',
        }
        const result = await checkNodeVersion.method(vJSON)
        expect(result.status).toEqual('pass')
    })
    it('returns status: pass', async () => {
        var vJSON = {
            _nodeVersion: '14.0',
        }
        const result = await checkNodeVersion.method(vJSON)
        expect(result.status).toEqual('pass')
    })
    it('returns status: pass', async () => {
        var vJSON = {
            _nodeVersion: '14.35.12',
        }
        const result = await checkNodeVersion.method(vJSON)
        expect(result.status).toEqual('pass')
    })
    it('returns status: pass', async () => {
        var vJSON = {
            _nodeVersion: '16',
        }
        const result = await checkNodeVersion.method(vJSON)
        expect(result.status).toEqual('pass')
    })
    it('returns status: pass', async () => {
        var vJSON = {
            _nodeVersion: '16.0',
        }
        const result = await checkNodeVersion.method(vJSON)
        expect(result.status).toEqual('pass')
    })
    it('returns status: pass', async () => {
        var vJSON = {
            _nodeVersion: '16.23.64.12',
        }
        const result = await checkNodeVersion.method(vJSON)
        expect(result.status).toEqual('pass')
    })
    it('returns status: fail', async () => {
        var vJSON = {
            _nodeVersion: '12.22.41',
        }
        const result = await checkNodeVersion.method(vJSON)
        expect(result.status).toEqual('fail')
    })
    it('returns status: fail', async () => {
        var vJSON = {
            _nodeVersion: '12.14.53',
        }
        const result = await checkNodeVersion.method(vJSON)
        expect(result.status).toEqual('fail')
    })
})
