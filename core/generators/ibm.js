const { runGenerators } = require('./common')

// A generator is a function that takes the user-inpuzt CLI args and produces some source code
const generators = {

  'deploy.sh': function (cliArgs) {
    const nodejsv = cliArgs['--runtime'] === 'latest'
      ? 'nodejs:10'
      : 'nodejs:' + cliArgs['--runtime'].match(/[0-9]+/)[0]
    return `npm install ; 
    zip -r deploypackage.zip * ; 
    ibmcloud fn action update ${cliArgs['--name']} deploypackage.zip --kind ${nodejsv};
    rm -f deploypackage.zip ;
    `
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
