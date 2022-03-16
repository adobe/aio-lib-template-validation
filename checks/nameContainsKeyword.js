async function nameContainsKeyword(metadataJSON) {
  if ('name' in metadataJSON) {
    var name = metadataJSON.name
    name = name.substring(name.lastIndexOf('/') + 1)
    if (name.startsWith('aio-app-builder-template')) {
      return {
        message: '',
        status: 'pass'
      }
    } else {
      return {
        message: 'Template name must start with the keyword aio-app-builder-template',
        status: 'fail'
      }
    }
  }
  return {
    message: 'Metadata input missing name',
    status: 'fail'
  }
}

module.exports = {
  method: nameContainsKeyword,
  description: "NPM package name should begin with keyword aio-app-builder-template"
}