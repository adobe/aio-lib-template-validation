module.exports = {
    rootDir: '../',
    testEnvironment: 'node',
    coverageReporters: ['lcovonly', 'html', 'text-summary'],
    coverageDirectory: '../coverage',
    collectCoverageFrom: ['src/**/*.js'],
}
