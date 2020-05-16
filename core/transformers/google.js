const { runTransformers } = require('./common')
const prettier = require('prettier')

const transformers = {

  'index.js': function (cliArgs, prevFileContent) {
    // append new export at the end for gcf to pick up
    // TODO test if this also works with
    // - ((async | NOTE: turns it into bg func, no logging but user should expect that anyway))
    //  - when user exports his func using exports. ... isntead of module.expoorts
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
  },

  'package.json': function (cliArgs, prevFileContent) {
    const nodejsv = cliArgs['--runtime'] === 'latest'
      ? 'nodejs10'
      : cliArgs['--runtime']
    const prevO = JSON.parse(prevFileContent)
    const o = {
      ...prevO,
      scripts: {
        ...prevO.scripts,
        deploy: `gcloud functions deploy ${cliArgs['--name']} --runtime ${nodejsv} --entry-point ${cliArgs['--name']} --trigger-http`
      }
    }
    return JSON.stringify(o, null, 2)
  }

}

function transformAll (cliArgs) {
  return runTransformers(cliArgs, transformers)
}

module.exports = {
  transformAll
}
