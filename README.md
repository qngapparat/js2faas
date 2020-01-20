# js2faas

CLI to turn JS apps into FaaS functions

## Install
```shell
npm i js2faas -g
```

## Basic Usage

```shell
$ js2faas OPTIONS... 
  
  Options
    --path <YOURAPPDIR> # local path to your JS app
    --name <FUNCTIONNAME>  # name for the FaaS function
    --runtime <'nodejs8' | 'nodejs10'>
    --entry-file <FNAME> # usually index.js
    [--aws-role] <AWSROLEARN>
```

`js2faas` will transpile your JS code, and put it into the newly created directories `amazon` and `google`, respectively

## Deploy

### To Amazon Lambda

```shell
cd amazon
npm run create # first time
# npm run update
```

### To Google Cloud Functions

```shell
cd google
npm run deploy
```

## Licence

MIT