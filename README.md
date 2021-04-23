# js2faas






JS Transpiler to port your code to Google, Amazon & IBM FaaS


## Code requirements

➡️ Your entry point must be in `index.js` and be default-exported, for instance `module.exports = (event) => { /* ... */ }`

➡️ It will receive exactly one argument, the invocation payload (commonly called `event`)


➡️ If your code returns something, it must be an `Object`, or a `Promise` thereof


## Install

Requires NodeJS >= 10.2.0

```shell
npm i js2faas -g
```

## Basic Usage


```shell
$ js2faas OPTIONS... 
  
  
  Options
    --name FUNCTIONNAME 
    --runtime 'nodejs8' | 'nodejs10' | 'latest'
    --aws-role AWSROLEARN
```


`js2faas` will transpile your JS code it finds in the current directory, and put it into the newly created folders `amazon`, `google` and `ibm`, respectively. NPM dependencies are supported.

## Deploy your code

Make sure you have installed the respective CLI tools (`aws`, `gcloud`, `ibm`) and have configured them. Otherwise the scripts will not know where to deploy to. Credentials are not baked into the folders.

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

Let's look into our `index.js`:
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
sh deploy.sh  # afterwards, sh update.sh

# --

cd google
sh deploy.sh

# -- 

cd ibm
sh deploy.sh
```


## Licence

Apache 2.0
