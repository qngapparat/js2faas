const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')
const fse = require('fs-extra')
const { copy } = require('./copiers')

const generateAmazonCode = require('./generators/amazon').generateAll
const transformAmazonCode = require('./transformers/amazon').transformAll
/**
 *
 * Transpiles the user code to amazon/
 * @param {*} cliArgs
 */
function amazon (cliArgs) {
  fs.mkdirSync(path.join(cliArgs['--path'], 'amazon'))

  // copy user's files into /amazon
  copy(
    cliArgs['--path'],
    path.join(cliArgs['--path'], 'amazon'),
    ['amazon', 'google']
  )

  // write generated files to amazon/...
  const generated = generateAmazonCode(cliArgs)
  generated.forEach(g => fs.writeFileSync(path.join(cliArgs['--path'], 'amazon', g.fn), g.content))

  // write transformed files to amazon/...
  const transformed = transformAmazonCode(cliArgs)
  transformed.forEach(t => fs.writeFileSync(path.join(cliArgs['--path'], 'amazon', t.fn), t.content))
}

module.exports = amazon
