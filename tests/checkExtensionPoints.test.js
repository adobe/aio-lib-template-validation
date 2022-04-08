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
const checkExtensionPoints = require('../src/checks/checkExtensionPoints.js');

describe(`install.yml contains extension points`, function () {
    it('extension points object returns status: pass', async () => {
        let extensionPointsYml = {
            extension: {name: 'dx/excshell/1'},
        };
        const result = await checkExtensionPoints.method(extensionPointsYml);
        expect(result.status).toEqual('pass');
    });
    it('missing extension point name returns status: fail', async () => {
        let extensionPointsYml = {
            extension: {operations: 'view'},
        };
        const result = await checkExtensionPoints.method(extensionPointsYml);
        expect(result.status).toEqual('fail');
        expect(result.message).toEqual(
            'install.yml must specify extension points'
        );
    });
    it('missing extension points returns status: fail', async () => {
        let extensionPointsYml = {
            noNameFiled: ['config'],
        };
        const result = await checkExtensionPoints.method(extensionPointsYml);
        expect(result.status).toEqual('fail');
        expect(result.message).toEqual(
            'install.yml must specify extension points'
        );
    });
    it('empty object returns status: fail', async () => {
        let extensionPointsYml = {};
        const result = await checkExtensionPoints.method(extensionPointsYml);
        expect(result.status).toEqual('fail');
    });
});
