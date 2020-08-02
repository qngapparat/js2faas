# js2faas

JS Transpiler to port your code to Google, Amazon & IBM FaaS

## Code requirements

⚠️ You must default-export your entry point, for instance `module.exports = (event) => { /* ... */ }`

⚠️ Your entry point will receive exactly one argument, the invocation payload (commonly called `event`)

⚠️ If your function returns something, it must be an `Object`, or a `Promise` thereof

## Install
```shell
npm i js2faas -g
```

## Basic Usage

Make sure you're calling `js2faas` in the directory of the function you want to port.

```shell
$ js2faas OPTIONS... 
  
  Options
    --name FUNCTIONNAME 
    --runtime 'nodejs8' | 'nodejs10' | 'latest'
    --entry-file FNAME # default-export your entry point in here
    --aws-role AWSROLEARN
```

`js2faas` will transpile your JS code it finds in the current directory, and put it into the newly created folders `amazon`, `google` and `ibm`, respectively. NPM dependencies are supported.

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

Apache 2.0
