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
const checkInstallSchema = require('../src/checks/checkInstallSchema')
const path = require('path')

describe('install.yaml must be valid', function () {
  it('Successfully validate install.yaml', async () => {
    const fixturePath = path.join(__dirname, '/fixtures/install-valid.yaml')
    const result = await checkInstallSchema.method(fixturePath)
    expect(result.status).toEqual('pass')
  })

  it('Unuccessfully validate install.yaml with suggestion', async () => {
    const fixturePath = path.join(__dirname, '/fixtures/install-invalid.yaml')
    const result = await checkInstallSchema.method(fixturePath)
    expect(result.status).toEqual('fail')
    expect(result.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          suggestion: expect.any(String),
          message: expect.any(String)
        })
      ])
    )
  })
})
