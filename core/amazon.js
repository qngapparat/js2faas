const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')
const fse = require('fs-extra')


const generateAmazonCode = require('./generate/amazon').generateAll
const transformAmazonCode = require('./transform/amazon').transformAll
/**
 * 
 * Transpiles the user code to /amazon
 * @param {*} cliArgs 
 */
function amazon(cliArgs) {
  fs.mkdirSync(path.join(cliArgs['--path'], 'amazon'))

  
  // copy user's files into /amazon
  const ns = fs.readdirSync(cliArgs['--path'])
    .filter(n => n !== 'amazon' && n !== 'google') 
    
  ns.forEach(n => {
    fse.copySync(path.join(cliArgs['--path'], n), path.join(cliArgs['--path'], 'amazon', n))
  })

  // write generated files to amazon/...
  const generated = generateAmazonCode(cliArgs)
  generated.forEach(g => fs.writeFileSync(path.join(cliArgs['--path'], 'amazon', g.fn), g.content))

  // write transformed files to amazon/...
  const transformed = transformAmazonCode(cliArgs)
  transformed.forEach(t => fs.writeFileSync(path.join(cliArgs['--path'], 'amazon', t.fn), t.content))
}

module.exports = amazon