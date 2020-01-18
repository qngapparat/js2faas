const fs = require('fs')
const path = require('path')

const transformers = {
  "package.json": function (cliArgs, prevFileContent) {
    const prevO = JSON.parse(prevFileContent)
    const o = {
      ...prevO,
      scripts: { // TODO amazon only supports nodejs.10, 12, others 8 and 10, ...
        ...prevO.scripts,
        create: `zip -r deploypackage.zip * ; \
          aws lambda create-function \
           --function-name ${cliArgs['--name']} \
           --runtime ${cliArgs['--runtime']}.x \
           --handler _index.handler \
           --role ${ cliArgs['--aws-role']} \
           --zip-file fileb://deploypackage.zip; \
           rm deploypackage.zip
           `,
        update: `zip -r deploypackage.zip * ; \
          aws lambda update-function-code \
           --function-name ${cliArgs['--name']} \
           --zip-file fileb://deploypackage.zip; \
           rm deploypackage.zip
          `
      }
    }
    return JSON.stringify(o, null, 2)
  }
}

/**
 * 
 * @param {*} cliArgs 
 * @returns {[{fn, content}]}
 */
function transformAll(cliArgs) {
  const fns = Object.keys(transformers)
  const prevFileContents = fns.map(fn => fs.readFileSync(path.join(cliArgs['--path'], fn), { encoding: 'utf-8' }))
  const newFileContents = fns.map((fn, idx) => (transformers[fn])(cliArgs, prevFileContents[idx]))
  
  return fns.map((fn,idx) => ({ fn: fn, content: newFileContents[idx]}))
}


module.exports = {
  transformAll
}