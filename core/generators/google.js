const { runGenerators } = require('./common')

// A generator is a function that takes the user-inpuzt CLI args and produces some source code
const generators = {}

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
