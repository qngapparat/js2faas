const fs = require('fs')
const path = require('path')

const createIndex = (dirPath, userFnFilename) => {
  return require('./_index').create(dirPath, userFnFilename)
}

const rewritePackage = (dirPath, rewriter) => {
  return require('./_package').rewrite(dirPath, rewriter)
}

const createUtils = () => {
  return fs.readFileSync(path.join(__dirname, '_utils.js'), { encoding: 'utf-8' })
}

module.exports = {
  createIndex,
  createUtils,
  rewritePackage
}