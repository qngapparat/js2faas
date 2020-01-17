#!/usr/bin/env node
const fs = require('fs')
const path = require('path')


const arg = require('arg')
const { createAmazon } = require('./templates/amazon')

const args = arg({
  '--path': String,
  '--entry-file': String,
  '--name': String,
  '--runtime': String,
  '--aws-role': String
})

if(args['--path'] == null) {
  console.log("Specify --path")
  process.exit()
}

if(args['--entry-file'] == null) {
  console.log("Specify --entry-file")
  process.exit()
}

if(args['--name'] == null) {
  console.log("Specify --name")
  process.exit()
}

if(args['--aws-role'] == null) {
  console.log("Specify --aws-role")
  process.exit()
}

if(args['--runtime'] == null) {
  console.log("Specify --runtime (nodejs8 | nodejs10)")
  process.exit()
}


createAmazon(args)


// // *write new index.js
// const newIndexContent = createIndex(args['--path'], args['--entry-file'])
// fs.writeFileSync(path.join(args['--path'], newIndexName), newIndexContent)

// // *write _utils.js
// const utilsContent = createUtils()
// fs.writeFileSync(path.join(args['--path'], '_utils.js'), utilsContent)

// // *rewrite package.json
// const rewriter = (packageJsonObj) => {
//   return {
//     ...packageJsonObj,
//     scripts: {
//       ...packageJsonObj.scripts,
//       createAmazon: `zip -r deploypackage.zip * ; \
//       aws lambda create-function \
//        --function-name ${args['--name']} \
//        --runtime ${args['--runtime'] + '.x'} \
//        --handler _index.runUserFunc \
//        --role ${args['--aws-role']} \
//        --zip-file fileb://deploypackage.zip; \
//        rm deploypackage.zip
//        `, 
//        updateAmazon: `zip -r deploypackage.zip * ; \
//        aws lambda update-function-code \
//         --function-name ${args['--name']} \
//         --zip-file fileb://deploypackage.zip; \
//         rm deploypackage.zip`,
//       deployGoogle: `gcloud functions deploy ${args['--name']} --runtime ${args['--runtime']} --entry-point runUserFunc --trigger-http`
//     }
//   }
// }
// rewritePackage(args['--path'], rewriter);

// js2faas --path . --entry-file index.js

// npm run deploy