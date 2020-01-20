const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')
const fse = require('fs-extra')
const { copy } = require('./copiers')

const generateGoogleCode = require('./generators/google').generateAll
const transformGoogleCode = require('./transformers/google').transformAll

/**
 *
 * Transpiles the user code to google/
 * @param {*} cliArgs
 */
function google (cliArgs) {
  fs.mkdirSync(path.join(cliArgs['--path'], 'google'))

  copy(
    cliArgs['--path'],
    path.join(cliArgs['--path'], 'google'),
    ['amazon', 'google']
  )

  // write generated files to google/
  // Currently does nothing

  const generated = generateGoogleCode(cliArgs)
  generated.forEach(g => fs.writeFileSync(path.join(cliArgs['--path'], 'google', g.fn), g.content))

  // write transformed files to google/
  const transformed = transformGoogleCode(cliArgs)
  transformed.forEach(t => fs.writeFileSync(path.join(cliArgs['--path'], 'google', t.fn), t.content))
}

module.exports = google
