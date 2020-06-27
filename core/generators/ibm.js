const { runGenerators } = require('./common')
const webpack = require('webpack')
const tmp = require('tmp')
const fs = require('fs')
const path = require('path')
const prettier = require('prettier')

// A generator is a function that takes the user-inpuzt CLI args and produces some source code
const generators = {
  'bundle.js': function (cliArgs) {
    const bundlef = tmp.fileSync({ postfix: '.js' })

    // code of user entry file
    let uentryc = fs.readFileSync(path.resolve(cliArgs['--path'], cliArgs['--entry-file']), { encoding: 'utf8' })

    // append signature for IBM
    uentryc += `

      global.main = module.exports
    `

    // where we will write entry file + signature
    const ibmentrypath = path.join(
      path.dirname(path.resolve(cliArgs['--path'], cliArgs['--entry-file'])), // the dir of entry-file
      '__index.js'
    )

    // write entry file + signature
    fs.writeFileSync(ibmentrypath, uentryc, { encoding: 'utf8' })

    // bundle user code with webpack, start with flavored entry file
    return new Promise((resolve, reject) => {
      // create dummy output file, webpack needs a place to write to
      webpack({
        mode: 'development',
        entry: ibmentrypath,
        output: {
          path: path.dirname(bundlef.name),
          filename: path.basename(bundlef.name)
        }
      }, (err) => {
        if (err) reject(err)
        resolve()
      })
    })
      .then(() => {
        // read webpack output
        const bundlec = fs.readFileSync(bundlef.name, { encoding: 'utf8' })
        return prettier.format(bundlec)
      })

      .finally(() => {
        // clean up __index.js
        fs.unlinkSync(ibmentrypath)
      })
  },

  'deploy.sh': function (cliArgs) {
    const nodejsv = cliArgs['--runtime'] === 'latest'
      ? 'nodejs:10'
      : 'nodejs:' + cliArgs['--runtime'].match(/[0-9]+/)[0]
    return `ibmcloud fn action update ${cliArgs['--name']} bundle.js --kind ${nodejsv}
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
