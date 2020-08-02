const path = require('path')
const fs = require('fs')
const { copy } = require('./copiers')

const generateIBMCode = require('./generators/ibm').generateAll
const transformIBMCode = require('./transformers/ibm').transformAll

/**
 *
 * Transpiles the user code to ibm/
 * @param {*} cliArgs
 */
async function ibm (cliArgs) {
  fs.mkdirSync(path.join(cliArgs['--path'], 'ibm'))

  copy(
    cliArgs['--path'],
    path.join(cliArgs['--path'], 'ibm'),
    ['amazon', 'google', 'ibm', '.git', '.github'] // ignore these
  )

  // TODO SET 1MIN TIMEOUT EVERYWHERE

  // TODO check if args passed are JSON or actual object

  // write generated files to ibm/
  const generated = await generateIBMCode(cliArgs)
  generated.forEach(g => fs.writeFileSync(path.join(cliArgs['--path'], 'ibm', g.fn), g.content))

  // write transformed files to ibm/
  // Currently does nothing
  const transformed = transformIBMCode(cliArgs)
  transformed.forEach(t => fs.writeFileSync(path.join(cliArgs['--path'], 'ibm', t.fn), t.content))
}

module.exports = ibm
