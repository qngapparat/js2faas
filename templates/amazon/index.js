const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')
// TODO remove linux shell cmds with fs...

function createAmazonFolder(cliArgs) {
  // copy all files to /amazon
  execSync(`mkdir ${cliArgs['--path']}/amazon`)
  const fns = execSync(`ls -A ${cliArgs['--path']}`, { encoding: 'utf-8' })
    .split('\n')
    .filter(n => n.length)
    .filter(n => n !== "amazon")
  fns.forEach(fn => {
    execSync(`cp -r ${fn} ${cliArgs['--path']}/amazon`)
  })
}

function writeIndexJs(cliArgs, freshIndexFileName) {

  const indexFileContent = `exports.runUserFunc = function runUserFunc(first, second, third, fourth) {
  
      const { getExecutingPlatform, transformInputAmazon, transformInputGoogle } = require('./_utils')
  
      // "google" | "amazon"
      const platform = getExecutingPlatform(first, second, third, fourth)
      
      let newInputs;
      if(platform === 'google') {
        newInputs = transformInputGoogle(first, second, third, fourth)
      }
  
      if(platform === 'amazon'){
        newInputs = transformInputAmazon(first, second, third, fourth)
      }
                              
      const userFunc = require('./${ cliArgs['--entry-file'] }')
       // run user function
      return userFunc(...newInputs)
    }`
    ;

  fs.writeFileSync(path.join(cliArgs['--path'], 'amazon', freshIndexFileName), indexFileContent)
}

// function writeUtilsJs(dirPath) {
//   const workingPath = path.join(dirPath, 'amazon')

// }

function rewritePackageJson(cliArgs, freshIndexFileName) {
  // TODO handle if there is no package json
  const packageJsonStr = fs.readFileSync(path.join(cliArgs['--path'], 'amazon', 'package.json'))
  let obj = JSON.parse(packageJsonStr)

  obj = {
    ...obj,
    scripts: { // TODO amazon only supports nodejs.10, 12, others 8 and 10, ...
      ...obj.scripts,
      create: `zip -r deploypackage.zip * ; \
      aws lambda create-function \
       --function-name ${cliArgs['--name']} \
       --runtime ${cliArgs['--runtime']}.x --handler ${freshIndexFileName.replace(/.js/g, '')}.runUserFunc \
       --role ${ cliArgs['--aws-role']} \
       --zip-file fileb://deploypackage.zip; \
       rm deploypackage.zip
       `,
      update: `zip -r deploypackage.zip * ; \
      aws lambda update-function-code \
       --function-name ${cliArgs['--name']} \
       --zip-file fileb://deploypackage.zip; \
       rm deploypackage.zip`
    }
  }

  const newPackageJsonContent = JSON.stringify(obj, null, 2)

  // write package.json
  fs.writeFileSync(path.join(cliArgs['--path'], 'amazon', 'package.json'), newPackageJsonContent)

}

function writeUtilsJs(cliArgs) {
  const utilsFileContent = `
  function getExecutingPlatform(fst, snd, ...rest) {
    // get platform
    // on amazon, second param is 'context' and hsa these fields
    if (
      snd &&
      typeof snd.invokedFunctionArn === 'string'
      && typeof snd.functionName === 'string'
      && typeof snd.awsRequestId === 'string'
    ) {
      return 'amazon'
    }
  
    if (
      fst &&
      typeof fst.method === 'string'
      && fst.get  // some methods that Express' Request objs alwys have
      && fst.accepts
      && fst.acceptsCharsets
      && fst.param
    ) {
      return 'google'
    }
  
    throw new Error("Couldn't recognize platform running this code, seems neither to be GC Functions nor Amazon Lambda");
  }
  
  
  function transformInputGoogle(first, second, third, fourth) {
    const req = first
    const event = {
      ...req.query,
      ...req.body
    }
  
    return [ event ]
  }
  
  function transformInputAmazon(first, second, third, fourth) {
    return [ first]
  }
  
  module.exports = {
    transformInputAmazon,
    transformInputGoogle,
    getExecutingPlatform
  }
  `
  fs.writeFileSync(path.join(cliArgs['--path'], 'amazon', '_utils.js'), utilsFileContent)

}

function createAmazon(cliArgs) {
  createAmazonFolder(cliArgs)

  const indexFileName = cliArgs['--entry-file'].includes('index.js')
    ? '_index.js'
    : 'index.js'

  writeIndexJs(cliArgs, indexFileName)
  writeUtilsJs(cliArgs)
  rewritePackageJson(cliArgs, indexFileName)
}

module.exports = {
  createAmazon
}