const fs = require('fs')
const path = require('path')

const rewrite = (dirPath, rewriter) => {
  const packageJsonStr = fs.readFileSync(path.join(dirPath, 'package.json'), { encoding: 'utf-8'})
  let obj = JSON.parse(packageJsonStr);

  // modify object
  obj = rewriter(obj);

  // back to JSON, overwrite old package.json
  fs.renameSync(path.join(dirPath, 'package.json'), path.join(dirPath, 'package.old.json'))
  fs.writeFileSync(path.join(dirPath, 'package.json'), JSON.stringify(obj, null, 2))

}

module.exports = { rewrite }