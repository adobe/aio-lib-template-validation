const { inspect } = require('util')
const logger = require('loglevel')
const { green, red, yellow } = require('kleur')

let logLevel = process.env.LOG_LEVEL || 'info'
if (!['trace', 'debug', 'info', 'warn', 'error'].includes(logLevel)) {
    logger.warn(
        `Invalid loglevel specified (${logLevel}). Defaulting to 'info'.`
    )
    logLevel = 'info'
}

const originalFactory = logger.methodFactory
logger.methodFactory = function (methodName, logLevel, loggerName) {
    const rawMethod = originalFactory(methodName, logLevel, loggerName)

    return function (...args) {
        if (methodName === 'debug') {
            rawMethod(
                ...args.map((arg) => {
                    if (typeof arg === 'string') {
                        return arg
                    }
                    return inspect(arg, { depth: 4 })
                })
            )
        } else if (methodName === 'info') {
            rawMethod(...args.map((arg) => green(arg)))
        } else if (methodName === 'warn') {
            rawMethod(...args.map((arg) => yellow(arg)))
        } else if (methodName === 'error') {
            rawMethod(...args.map((arg) => red(arg)))
        } else {
            rawMethod(...args)
        }
    }
}

logger.setDefaultLevel(logLevel)
logger.setLevel(logger.getLevel()) //apply plugin

module.exports = {
    logger,
}
