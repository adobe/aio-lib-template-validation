const { describe, it, expect } = require('@jest/globals')
const containsKeyword = require('../src/checks/containsKeyword')

describe(`contains keyword aio-app-builder-template`, function () {
    it('keyword aio-app-builder-template, returns status: pass', async () => {
        var keywordJSON = {
            keywords: ['aio-app-builder-template', 'config'],
        }
        const result = await containsKeyword.method(keywordJSON)
        expect(result.status).toEqual('pass')
    })
    it('keyword ecosystem:aio-app-builder-template, returns status: pass', async () => {
        var keywordJSON = {
            keywords: ['ecosystem:aio-app-builder-template', 'config'],
        }
        const result = await containsKeyword.method(keywordJSON)
        expect(result.status).toEqual('pass')
    })
    it('missing aio-app-builder-template keyword, returns status: fail', async () => {
        var keywordJSON = {
            keywords: ['config'],
        }
        const result = await containsKeyword.method(keywordJSON)
        expect(result.status).toEqual('fail')
        expect(result.message).toEqual(
            'ecosystem:aio-app-builder-template must be one of the keywords in the NPM package'
        )
    })
    it('missing keywords, returns status: fail', async () => {
        var keywordJSON = {
            nokeywords: ['config'],
        }
        const result = await containsKeyword.method(keywordJSON)
        expect(result.status).toEqual('fail')
        expect(result.message).toEqual('Metadata input missing keywords')
    })
})
