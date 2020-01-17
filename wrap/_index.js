// todo what about gcloud named export
const path = require('path')
/**
 * 
 @returns {string} Source code for _index.js
 */
const create = (dirPath, userFnFilename) => {
  // TODO export it
  return `exports.runUserFunc = function runUserFunc(first, second, third, fourth) {

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
                            
    const userFunc = require('./${ userFnFilename }')
     // run user function
    return userFunc(...newInputs)
  }`; ///////////////////////////////// TODO this results in require('index.js') which is incorrect
}

module.exports = { create }