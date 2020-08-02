const { runTransformers } = require('./common')

const transformers = {

  'index.js': function (cliArgs, prevFileContent) {
    return `
      ${prevFileContent}
    
      ; module.exports.main = module.exports ; /* Name entry point for IBM */
      `
  }
}

function transformAll (cliArgs) {
  return runTransformers(cliArgs, transformers)
}

module.exports = {
  transformAll
}
