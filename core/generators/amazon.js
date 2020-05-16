const { runGenerators } = require('./common')
const prettier = require('prettier')

// A generator is a function that takes the user-inpuzt CLI args and produces some source code
const generators = {
  '_index.js': function (cliArgs) {
    return prettier.format(`
exports.handler = function runUserFunc(first, second, third, fourth) {
                          
  const userFunc = require('./${cliArgs['--entry-file']}')
    // run user function with 'event'
  let res;
  try {
    res = userFunc(first)
  } catch(e) {
    second.fail(e)
  }
  second.succeed(res)
}
  `)
  }
}

/**
 *
 * @returns {[{fn, content}]} Array of { fn: ..., content: ... }
 */
function generateAll (cliArgs) {
  return runGenerators(cliArgs, generators)
}

module.exports = {
  generateAll
}
