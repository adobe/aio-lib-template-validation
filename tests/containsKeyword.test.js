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

const {describe, it, expect} = require('@jest/globals');
const containsKeyword = require('../src/checks/containsKeyword');

describe(`contains keyword aio-app-builder-template`, function () {
    it('keyword aio-app-builder-template, returns status: pass', async () => {
        let keywordJSON = {
            keywords: ['aio-app-builder-template', 'config'],
        };
        const result = await containsKeyword.method(keywordJSON);
        expect(result.status).toEqual('pass');
    });
    it('keyword ecosystem:aio-app-builder-template, returns status: pass', async () => {
        let keywordJSON = {
            keywords: ['ecosystem:aio-app-builder-template', 'config'],
        };
        const result = await containsKeyword.method(keywordJSON);
        expect(result.status).toEqual('pass');
    });
    it('missing aio-app-builder-template keyword, returns status: fail', async () => {
        let keywordJSON = {
            keywords: ['config'],
        };
        const result = await containsKeyword.method(keywordJSON);
        expect(result.status).toEqual('fail');
        expect(result.message).toEqual(
            'ecosystem:aio-app-builder-template must be one of the keywords in package.json'
        );
    });
    it('missing keywords, returns status: fail', async () => {
        let keywordJSON = {
            nokeywords: ['config'],
        };
        const result = await containsKeyword.method(keywordJSON);
        expect(result.status).toEqual('fail');
        expect(result.message).toEqual('package.json must contain keywords');
    });
    it('returns status: fail', async () => {
        let vJSON = {};
        const result = await containsKeyword.method(vJSON);
        expect(result.status).toEqual('fail');
    });
});
