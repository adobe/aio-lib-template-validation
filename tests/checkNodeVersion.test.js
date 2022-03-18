const { describe, it, expect } = require('@jest/globals')
const checkNodeVersion = require('../src/checks/checkNodeVersion')

describe(`checks node version ^14 || ^16`, function () {
    it('returns status: pass', async () => {
        var vJSON = {
            _nodeVersion: '14',
        }
        const result = await checkNodeVersion.method(vJSON)
        expect(result.status).toEqual('pass')
    })
    it('returns status: pass', async () => {
        var vJSON = {
            _nodeVersion: '14.0',
        }
        const result = await checkNodeVersion.method(vJSON)
        expect(result.status).toEqual('pass')
    })
    it('returns status: pass', async () => {
        var vJSON = {
            _nodeVersion: '14.35.12',
        }
        const result = await checkNodeVersion.method(vJSON)
        expect(result.status).toEqual('pass')
    })
    it('returns status: pass', async () => {
        var vJSON = {
            _nodeVersion: '16',
        }
        const result = await checkNodeVersion.method(vJSON)
        expect(result.status).toEqual('pass')
    })
    it('returns status: pass', async () => {
        var vJSON = {
            _nodeVersion: '16.0',
        }
        const result = await checkNodeVersion.method(vJSON)
        expect(result.status).toEqual('pass')
    })
    it('returns status: pass', async () => {
        var vJSON = {
            _nodeVersion: '16.23.64.12',
        }
        const result = await checkNodeVersion.method(vJSON)
        expect(result.status).toEqual('pass')
    })
    it('returns status: fail', async () => {
        var vJSON = {
            _nodeVersion: '12.22.41',
        }
        const result = await checkNodeVersion.method(vJSON)
        expect(result.status).toEqual('fail')
    })
    it('returns status: fail', async () => {
        var vJSON = {
            _nodeVersion: '12.14.53',
        }
        const result = await checkNodeVersion.method(vJSON)
        expect(result.status).toEqual('fail')
    })
})
