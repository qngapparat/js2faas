#!/usr/bin/env node
const arg = require('arg')
const chalk = require('chalk')

const amazon = require('./core/amazon')
const google = require('./core/google')
const ibm = require('./core/ibm')

// TODO google, handle xml, multipart, etc https://cloud.google.com/functions/docs/writing/http

// Pretty printing
const ERR = txt => chalk.bgRed.bold.black(' ERROR ') + ' ' + txt
const HINT = txt => '💡 ' + txt
console.error = (txt) => console.log(ERR(txt))

const args = arg({
  '--name': String,
  '--runtime': String,
  '--aws-role': String
})

console.log(HINT("Make sure you're calling this in the directory of the function you want to port."))

if (args['--name'] == null) {
  console.log(ERR('Specify --name'))
  process.exit()
}

if (/^[a-zA-Z0-9]+$/.test(args['--name']) === false) {
  console.log(ERR('--name must be alphanumeric ([a-zA-Z0-9]+)'))
  process.exit()
}

if (args['--aws-role'] == null) {
  console.log(ERR('Specify --aws-role'))
  process.exit()
}

if (args['--runtime'] == null || /^nodejs8|nodejs10|latest$/.test(args['--runtime'] === false)) {
  console.log(ERR('Specify --runtime (nodejs8 | nodejs10 | latest)'))
  process.exit()
}

// Assume current path is where the function is
args['--path'] = process.cwd()

amazon(args)
google(args)
ibm(args)
