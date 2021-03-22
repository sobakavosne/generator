const { IO }              = require('monet')

const { exec }            = require('child_process')

const { trace }           = require('./source/utils/helpers')

const { generateContacts
      , generateTelephones
      }                   = require('./source/utils/generators')

const { N
      , HOST
      , DATABASE
      , GENNUMBER
      , TELLENGTH
      , PSSWDLENGTH
      , HASHTAGLENGTH
      , MINCONTACTSNUMBER
      , MAXCONTACTSNUMBER
      }                   = require('dotenv').config().parsed

const nodeProcessIO       = (runner)    => IO(() => exec(`node --max-old-space-size=4096 ${runner}`, (err, stdout, stderr) => stdout))

const generateWithCildIO  = (matrix,
                             runnerName
                            )           => R.head(matrix)
                                            ? new Promise(resolve => resolve(nodeProcessIO(runnerName)))
                                              .then((child) => child.on('exit', generateWithCildIO(R.tail(matrix), runnerName)))
                                            : undefined

const generateWithRedCIO  = (matrix,
                             runnerName
                            )           => R.__

// dir = exec("ls -a", (err, stdout, stderr) => trace(stdout))

// dir.on('exit', (code) => trace(code))

// new Promise((rs, rj) => setTimeout(() => rs(exec("ls -a", (e, x, y) => trace(x))), 1000))
//   .then((dir) => dir.on('exit', (code) => setTimeout(() => trace(code), 1000)))
