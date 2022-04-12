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
const checkServices = require('../src/checks/checkServices.js');

describe(`install.yml contains services`, function () {
    it('services array returns status: pass', async () => {
        let servicesYml = {
            services: ['AnalyticsSDK', 'CampaignStandard'],
        };
        const result = await checkServices.method(servicesYml);
        expect(result.status).toEqual('pass');
    });
    it('missing services returns status: fail', async () => {
        let servicesYml = {
            noNameFiled: ['config'],
        };
        const result = await checkServices.method(servicesYml);
        expect(result.status).toEqual('fail');
        expect(result.message).toEqual(
            'install.yml must contain a list of services that template utilizes'
        );
    });
    it('empty object returns status: fail', async () => {
        let servicesYml = {};
        const result = await checkServices.method(servicesYml);
        expect(result.status).toEqual('fail');
    });
});
