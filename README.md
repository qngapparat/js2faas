# js2faas

Write FaaS code once, run on Google & Amazon

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
    --runtime 'nodejs8' | 'nodejs10'
    --entry-file FNAME
    --aws-role AWSROLEARN
```

`js2faas` will transpile your JS code, and put it into the newly created directories `amazon` and `google`, respectively

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

## Licence

MIT