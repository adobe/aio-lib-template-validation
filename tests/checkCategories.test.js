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

const { describe, it, expect } = require('@jest/globals');
const checkCategories = require('../src/checks/checkCategories.js');

describe(`install.yml contains categories`, function () {
    it('categories array returns status: pass', async () => {
        let categoriesYml = {
            categories: ['add-action', 'add-web-assets'],
        };
        const result = await checkCategories.method(categoriesYml);
        expect(result.status).toEqual('pass');
    });
    it('missing categories returns status: fail', async () => {
        let categoriesYml = {
            noNameFiled: ['config'],
        };
        const result = await checkCategories.method(categoriesYml);
        expect(result.status).toEqual('fail');
        expect(result.message).toEqual(
            'install.yml must contain a list of categories'
        );
    });
    it('empty object returns status: fail', async () => {
        let categoriesYml = {};
        const result = await checkCategories.method(categoriesYml);
        expect(result.status).toEqual('fail');
    });
});
