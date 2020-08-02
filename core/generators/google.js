const { runGenerators } = require('./common')

// A generator is a function that takes the user-inpuzt CLI args and produces some source code
const generators = {
  'deploy.sh': function (cliArgs) {
    const nodejsv = cliArgs['--runtime'] === 'latest'
      ? 'nodejs10'
      : cliArgs['--runtime']
    return `npm install ; gcloud functions deploy ${cliArgs['--name']} --runtime ${nodejsv} --entry-point ${cliArgs['--name']} --trigger-http`
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
