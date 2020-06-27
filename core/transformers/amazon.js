const { runTransformers } = require('./common')

// A transformator is a function that takes the user-input CLI args, and mutates a file content string
const transformers = {}

function transformAll (cliArgs) {
  return runTransformers(cliArgs, transformers)
}

module.exports = {
  transformAll
}
