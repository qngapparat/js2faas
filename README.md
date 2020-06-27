# js2faas

JS Transpiler to port your code to Google, Amazon & IBM FaaS

## Install
```shell
npm i js2faas -g
```

## Basic Usage

```shell
$ js2faas OPTIONS... 
  
  Options
    --path YOURAPPDIR 
    --name FUNCTIONNAME 
    --runtime 'nodejs8' | 'nodejs10' | 'latest'
    --entry-file FNAME # default-export your entry point in here
    --aws-role AWSROLEARN
```

`js2faas` will transpile your JS code, and put it into the newly created directories `amazon`, `google` and `ibm`, respectively

## Deploy your code

### To Amazon Lambda

```shell
cd amazon
npm run create # afterwards, npm run update
```

### To Google Cloud Functions

```shell
cd google
npm run deploy
```

### To IBM Functions

```shell
cd ibm
npm run deploy
```


## Example

```
├── index.js
├── node_modules
├── package.json
└── package-lock.json
```

Let's say your entry point is `index.js`:
```js
// default-export your entry point
module.exports = (event) => {
 console.log(`Data passed: ${ event }`);
 return { a: 1, b: 2 }
}
```

Run `js2faas`
```shell
js2faas
  --path . 
  --name newFuncName
  --entry-file index.js
  --runtime nodejs10
  --aws-role xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

```
├── index.js
├── node_modules
├── package.json
├── package-lock.json
|
├── amazon
├── google
└── ibm
```

Deploy the function

```sh
cd amazon
sh create.sh  # afterwards, sh update.sh

# --

cd google
sh deploy.sh

# -- 

cd ibm
sh deploy.sh
```


## Licence

MIT
