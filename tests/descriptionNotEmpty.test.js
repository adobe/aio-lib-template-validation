const { describe, it, expect } = require('@jest/globals')
const descriptionNotEmpty = require('../src/checks/descriptionNotEmpty')

describe(`checks description is not empty`, function () {
    it('returns status: pass', async () => {
        var descJSON = {
            description: 'Mock description',
        }
        const result = await descriptionNotEmpty.method(descJSON)
        expect(result.status).toEqual('pass')
    })
    it('empty description, returns status: fail', async () => {
        var descJSON = {
            description: '',
        }
        const result = await descriptionNotEmpty.method(descJSON)
        expect(result.status).toEqual('fail')
        expect(result.message).toEqual('NPM package missing description.')
    })
    it('missing description, returns status: fail', async () => {
        var descJSON = {
            noDesc: 'description not a key',
        }
        const result = await descriptionNotEmpty.method(descJSON)
        expect(result.status).toEqual('fail')
        expect(result.message).toEqual('Metadata input missing description')
    })
})
