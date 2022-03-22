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
const descriptionNotEmpty = require('../src/checks/descriptionNotEmpty')

describe(`checks description is not empty`, function () {
    it('returns status: pass', async () => {
        var descJSON = {
            description: 'Mock description',
        }
        const result = await descriptionNotEmpty.method(descJSON)
        expect(result.status).toEqual('pass')
    })
    it('empty description, returns status: fail', async () => {
        var descJSON = {
            description: '',
        }
        const result = await descriptionNotEmpty.method(descJSON)
        expect(result.status).toEqual('fail')
        expect(result.message).toEqual('NPM package missing description.')
    })
    it('missing description, returns status: fail', async () => {
        var descJSON = {
            noDesc: 'description not a key',
        }
        const result = await descriptionNotEmpty.method(descJSON)
        expect(result.status).toEqual('fail')
        expect(result.message).toEqual('Metadata input missing description')
    })
    it('returns status: fail', async () => {
        var vJSON = {}
        const result = await descriptionNotEmpty.method(vJSON)
        expect(result.status).toEqual('fail')
    })
    it('input is null, returns status: fail', async () => {
        var vJSON = null
        const result = await descriptionNotEmpty.method(vJSON)
        expect(result.status).toEqual('fail')
    })
})