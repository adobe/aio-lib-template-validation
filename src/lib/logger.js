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
