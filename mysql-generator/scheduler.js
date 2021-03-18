const { trace }           = require('./source/utils/helpers')

const { exec }            = require('child_process')

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

const generateSequentially = () => new Promise(resolve => 
                                      resolve(exec(`node --max-old-space-size=4096 index.js`, (err, stdout, stderr) => trace(stdout))))
                                    .then((child) => child.on('exit', (code) => trace(code)))

generateSequentially()

// dir = exec("ls -a", (err, stdout, stderr) => trace(stdout))

// dir.on('exit', (code) => trace(code))

// new Promise((rs, rj) => setTimeout(() => rs(exec("ls -a", (e, x, y) => trace(x))), 1000))
//   .then((dir) => dir.on('exit', (code) => setTimeout(() => trace(code), 1000)))
