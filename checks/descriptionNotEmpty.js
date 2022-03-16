async function descriptionNotEmpty(metadataJSON) {
  if ('description' in metadataJSON) {
    if(!metadataJSON.description) {
      return {
        message: 'NPM package missing description.',
        status: 'fail'
      }
    }
    return {
      message: '',
      status: 'pass'
    }
  }
  return {
    message: 'Metadata input missing description',
    status: 'fail'
  }
}

module.exports = {
  method: descriptionNotEmpty,
  description: "Description of NPM package is not empty"
}