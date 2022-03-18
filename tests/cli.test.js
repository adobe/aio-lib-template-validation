const { describe, it, expect } = require('@jest/globals')
const { join } = require('path')
const pkgDir = require('pkg-dir')
const { execFile } = require('child_process')

const packageRootDirectory = pkgDir.sync(__dirname)

function runCli(argArray) {
    return new Promise((resolve) => {
        const child = execFile(
            'node',
            [join(packageRootDirectory, 'src', 'index.js'), ...argArray],
            (error, stdout, stderr) => {
                resolve({
                    exitCode: child.exitCode,
                    error,
                    stdout,
                    stderr,
                })
            }
        )
    })
}

describe(`cli`, function () {
    it('exits with code 1 on failure', async () => {
        const result = await runCli([
            'run-checks',
            'https://www.npmjs.com/package/@bundle-validator/cli',
        ])
        expect(result.exitCode).toEqual(1)
    })

    it('exits with code 0 on success', async () => {
        const result = await runCli([
            'run-checks',
            'https://www.npmjs.com/package/@adobe/generator-app-asset-compute',
        ])
        expect(result.exitCode).toEqual(0)
    })

    it('exits with code 0 on success', async () => {
        const result = await runCli([
            'run-checks',
            'https://www.npmjs.com/package/@adobe/generator-app-excshell',
        ])
        expect(result.exitCode).toEqual(0)
    })
})
