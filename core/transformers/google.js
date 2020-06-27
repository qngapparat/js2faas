const { runTransformers } = require('./common')
const prettier = require('prettier')

const transformers = {

  'index.js': function (cliArgs, prevFileContent) {
    // append new export at the end for gcf to pick up
    // TODO test if this also works with
    // - ((async | NOTE: turns it into bg func, no logging but user should expect that anyway))
    //  - when user exports his func using exports. ... instead of module.exports
    return prettier.format(`
    ${prevFileContent || ''}
    module.exports.${cliArgs['--name']} = async function runUserFunc(req, res) {
                              
      const userFunc = require('./${cliArgs['--entry-file']}')
      const event = {
        ...req.query,
        ...req.body
      }
       // run user function with 'event'
      const outp = await userFunc(event)
      if(outp) {
        res.json(outp)
      } else {
        res.sendStatus(200)
      }
    }
  `)
  }

}

function transformAll (cliArgs) {
  return runTransformers(cliArgs, transformers)
}

module.exports = {
  transformAll
}
