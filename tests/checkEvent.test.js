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
const checkEvent = require('../src/checks/checkEvent.js');

describe('Validation of the "event" property in install.yml', function () {
    let installYmlData = {
        categories: ['code', 'ui'],
    };
    it('"event" is an optional property', async () => {
        const result = await checkEvent.method(installYmlData);
        expect(result).toEqual({
            message: '',
            status: 'pass',
        });
    });
    it('"event" must be an object', async () => {
        installYmlData['event'] = {
            consumer: {
              type: "some-type",
              provider: [
                "event-type-1",
                "event-type-2"
              ]
            }
        };
        const result = await checkEvent.method(installYmlData);
        expect(result).toEqual({
            message: '',
            status: 'pass',
        });
    });
    it('"event" must be an object', async () => {
        installYmlData['event'] = "event";
        const result = await checkEvent.method(installYmlData);
        expect(result).toEqual({
          message: '"event" must be an object.',
          status: 'fail',
        });
    });
});
