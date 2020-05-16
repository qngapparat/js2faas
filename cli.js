#!/usr/bin/env node
// ^ important

const amazon = require('./core/amazon')
const google = require('./core/google')

// TODO ensure --name is alphanumeric (since we use it as export name for google)
// TODO don't ask for role if only --google
// TODO handle the nodejs8/10/12 platform differing support (google 8 and 10, aws 10 and 12, ...)

// TODO google, handly xml, multipart, etc https://cloud.google.com/functions/docs/writing/http

const arg = require('arg')

const args = arg({
  '--path': String,
  '--entry-file': String,
  '--name': String,
  '--runtime': String,
  '--aws-role': String
})

if (args['--path'] == null) {
  console.log('Specify --path')
  process.exit()
}

if (args['--entry-file'] == null) {
  console.log('Specify --entry-file')
  process.exit()
}

if (args['--name'] == null) {
  console.log('Specify --name')
  process.exit()
}

if (args['--aws-role'] == null) {
  console.log('Specify --aws-role')
  process.exit()
}

if (args['--runtime'] == null) {
  console.log('Specify --runtime (nodejs8 | nodejs10)')
  process.exit()
}

amazon(args)
google(args)
