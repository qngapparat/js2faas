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
  },

  'deploy.sh': function (cliArgs) {
    const nodejsv = cliArgs['--runtime'] === 'latest'
      ? 'nodejs12'
      : cliArgs['--runtime']

    return `zip -r deploypackage.zip * ;
     aws lambda create-function \
     --function-name ${cliArgs['--name']} \
     --runtime ${nodejsv}.x \
     --handler _index.handler \
     --role ${cliArgs['--aws-role']} \
     --zip-file fileb://deploypackage.zip ;
     rm deploypackage.zip
    `
  },

  'update.sh': function (cliArgs) {
    return `zip -r deploypackage.zip * ; \
        aws lambda update-function-code \
        --function-name ${cliArgs['--name']} \
        --zip-file fileb://deploypackage.zip; \
        rm deploypackage.zip
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
