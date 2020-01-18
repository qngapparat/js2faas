const fs = require('fs')
const path = require('path')

const generators = {
  "_index.js": function (cliArgs) {
    return `
    exports.handler = function runUserFunc(first, second, third, fourth) {
                              
      const userFunc = require('./${ cliArgs['--entry-file']}')
       // run user function with 'event'
      return userFunc(first)
    }
  `
  }
}

/**
 * 
 * @returns {[{fn, content}]} Array of { fn: ..., content: ... }
 */
function generateAll(cliArgs) {
  const fns = Object.keys(generators); // array
  const contents = fns.map(fn => (generators[fn])(cliArgs)) // array
  return fns.map((fn, idx) => ({ fn: fn, content: contents[idx]}))
}


module.exports = {
  generateAll
}