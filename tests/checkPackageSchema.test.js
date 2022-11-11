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
const checkPackageSchema = require('../src/checks/checkPackageSchema')
const path = require('path')

describe('package.json must be valid', function () {
  it('Successfully validate package.json', async () => {
    const fixturePath = path.join(__dirname, '/fixtures/package-valid.json')
    const result = await checkPackageSchema.method(fixturePath)
    expect(result.status).toEqual('pass')
  })

  it('Unuccessfully validate package.json', async () => {
    const fixturePath = path.join(__dirname, '/fixtures/package-invalid.json')
    const result = await checkPackageSchema.method(fixturePath)
    expect(result.status).toEqual('fail')
  })
})
