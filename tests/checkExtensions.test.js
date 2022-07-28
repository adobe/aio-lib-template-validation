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
const checkExtensions = require('../src/checks/checkExtensions.js');

describe('Validation of the "extension" property in install.yml', function () {
    let installYmlData = {
        categories: ['code', 'ui'],
    };
    it('"extensions" is an optional property', async () => {
        const result = await checkExtensions.method(installYmlData);
        expect(result).toEqual({
            message: '',
            status: 'pass',
        });
    });
    it('"extensions" - an extension must provide the "extensionPointId" key', async () => {
        installYmlData['extensions'] = [
            { extensionPointId: 'dx/excshell/1' }
        ] 
        const result = await checkExtensions.method(installYmlData);
        expect(result).toEqual({
            message: '',
            status: 'pass',
        });
    });
    it('"extensions" - an extension item must be an object', async () => {
        installYmlData['extensions'] = [
            'dx/excshell/1'
        ] 
        const result = await checkExtensions.method(installYmlData);
        expect(result).toEqual({
            message: 'extension item is not an object',
            status: 'fail',
        });
    });
    it('empty array fails validation', async () => {
        installYmlData['extensions'] = [];
        const result = await checkExtensions.method(installYmlData);
        expect(result).toEqual({
            message: 'extensions array cannot be empty',
            status: 'fail',
        });
    });
});
