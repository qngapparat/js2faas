const path = require('path')
const fs = require('fs')
const { copy } = require('./copiers')

const generateGoogleCode = require('./generators/google').generateAll
const transformGoogleCode = require('./transformers/google').transformAll

/**
 *
 * Transpiles the user code to google/
 * @param {*} cliArgs
 */
async function google (cliArgs) {
  fs.mkdirSync(path.join(cliArgs['--path'], 'google'))

  copy(
    cliArgs['--path'],
    path.join(cliArgs['--path'], 'google'),
    ['amazon', 'google', 'ibm', '.git', '.github'] // ignore these
  )

  // write generated files to google/
  // Currently does nothing
  const generated = await generateGoogleCode(cliArgs)
  generated.forEach(g => fs.writeFileSync(path.join(cliArgs['--path'], 'google', g.fn), g.content))

  // write transformed files to google/
  const transformed = transformGoogleCode(cliArgs)
  transformed.forEach(t => fs.writeFileSync(path.join(cliArgs['--path'], 'google', t.fn), t.content))
}

module.exports = google
