module.exports = {
    rootDir: '../',
    testTimeout: 10000, // 10 seconds
    testEnvironment: 'node',
    coverageReporters: ['lcovonly', 'html', 'text-summary'],
    coverageDirectory: '../coverage',
    collectCoverageFrom: ['src/**/*.js'],
}
