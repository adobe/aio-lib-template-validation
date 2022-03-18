async function checkNodeVersion(metadataJSON) {
    if ('_nodeVersion' in metadataJSON) {
        var nodeVersion = metadataJSON._nodeVersion
        const regex14 = new RegExp('^14(.[0-9]d*)*')
        const regex16 = new RegExp('^16(.[0-9]d*)*')
        if (regex14.test(nodeVersion) || regex16.test(nodeVersion)) {
            return {
                message: '',
                status: 'pass',
            }
        }
        return {
            message: `Node version of NPM package is ${nodeVersion}, which is not ^14 or ^16.`,
            status: 'fail',
        }
    }
    return {
        message: 'Metadata input missing node version',
        status: 'fail',
    }
}

module.exports = {
    method: checkNodeVersion,
    description:
        'NPM package must run on all active LTS versions of NodeJS (^14 || ^16)',
}
