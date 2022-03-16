var exec = require('sync-exec')
const runChecks = require('../lib/runChecks')

async function getTemplateMetadata (packageName) {
  // Exec output contains both stderr and stdout outputs
  return exec(`npm view ${packageName} --json`).stdout
};



async function check(packageUrl) {
  var p_url = new URL(packageUrl)
  var p_url_path = p_url.pathname
  var packageName = p_url_path.split("package/")[1]
  var templateMetadata = await getTemplateMetadata(packageName)
  var templateJSON = JSON.parse(templateMetadata)
  await runChecks(templateJSON)
};

module.exports = check