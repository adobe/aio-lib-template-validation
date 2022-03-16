const Mocha = require('mocha')
const { logger } = require('./logger')

const checkNodeVersion = require('../../checks/checkNodeVersion')
const descriptionNotEmpty = require('../../checks/descriptionNotEmpty')
const nameContainsKeyword = require('../../checks/nameContainsKeyword')

const checks = [descriptionNotEmpty, nameContainsKeyword, checkNodeVersion]

async function runChecks(metadataJSON) {
  const mocha = new Mocha({
    reporter: 'spec'
  })
  const suite = new Mocha.Suite('Validating App Builder templates')
  suite.timeout(0)
  for (let check of checks) {
    suite.addTest(
      new Mocha.Test(check.description, async function() {
        const result = await check.method(metadataJSON)
        if(result.status === 'pass') {
          return true
        }
        throw new Error(result.message)
      })
    )
  }
  mocha.suite.addSuite(suite)
  await new Promise((resolve, reject) => {
    mocha.run((failures) => {
      if (failures) {
        logger.error(`${failures} failures found. See report.`)
        process.exitCode = 1
        resolve()
      }
      resolve()
    })
  })
}

module.exports = runChecks