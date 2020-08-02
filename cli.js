#!/usr/bin/env node
const amazon = require('./core/amazon')
const google = require('./core/google')
const ibm = require('./core/ibm')

// TODO google, handle xml, multipart, etc https://cloud.google.com/functions/docs/writing/http

const arg = require('arg')

const args = arg({
  '--entry-file': String,
  '--name': String,
  '--runtime': String,
  '--aws-role': String
})

console.log("Tip: Make sure you're calling this in the directory of the function you want to port.")

if (args['--entry-file'] == null) {
  console.log('Specify --entry-file')
  process.exit()
}

if (args['--name'] == null) {
  console.log('Specify --name')
  process.exit()
}

if (/^[a-zA-Z0-9]+$/.test(args['--name']) === false) {
  console.log('--name must be alphanumeric ([a-zA-Z0-9]+)')
  process.exit()
}

if (args['--aws-role'] == null) {
  console.log('Specify --aws-role')
  process.exit()
}

if (args['--runtime'] == null || /^nodejs8|nodejs10|latest$/.test(args['--runtime'] === false)) {
  console.log('Specify --runtime (nodejs8 | nodejs10 | latest)')
  process.exit()
}

// Assume current path is where the function is
args['--path'] = __dirname

amazon(args)
google(args)
ibm(args)
