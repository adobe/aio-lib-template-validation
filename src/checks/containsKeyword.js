async function containsKeyword(metadataJSON) {
    if ('keywords' in metadataJSON) {
        const index = metadataJSON.keywords.findIndex((element) => {
            if (element.includes('aio-app-builder-template')) {
                return true
            }
        })
        if (index != -1) {
            return {
                message: '',
                status: 'pass',
            }
        } else {
            return {
                message:
                    'ecosystem:aio-app-builder-template must be one of the keywords in the NPM package',
                status: 'fail',
            }
        }
    }
    return {
        message: 'Metadata input missing keywords',
        status: 'fail',
    }
}

module.exports = {
    method: containsKeyword,
    description: 'NPM package should have keyword aio-app-builder-template',
}
