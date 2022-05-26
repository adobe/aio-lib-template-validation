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
const checkServices = require('../src/checks/checkServices.js');

describe('Validation of the "apis" property in install.yml', function () {
    let installYmlData = {
        categories: ['code', 'ui'],
    };
    it('"apis" is an optional property', async () => {
        const result = await checkServices.method(installYmlData);
        expect(result).toEqual({
            message: '',
            status: 'pass',
        });
    });
    it('"apis" must be an array of objects containing the "code" key', async () => {
        installYmlData['apis'] = [
            {
                code: 'AnalyticsSDK',
                credentials: 'OAuth',
            },
            {
                code: 'CampaignStandard',
            },
        ];
        const result = await checkServices.method(installYmlData);
        expect(result).toEqual({
            message: '',
            status: 'pass',
        });
    });
    it('Incorrect services fail validation', async () => {
        installYmlData['apis'] = [
            {},
            {
                code: 'CampaignStandard',
            },
        ];
        const result = await checkServices.method(installYmlData);
        expect(result).toEqual({
            message:
                '"apis" must be an array of objects containing the "code" key',
            status: 'fail',
        });
    });
});
