const { IO }              = require('monet')

const { exec }            = require('child_process')

const { trace }           = require('./source/utils/helpers')

const { GENERATIONAMOUNT 
      }                   = require('./index')

const { MARK }            = require('dotenv').config().parsed

const nodeProcessIO       = (runner,
                             mark
                            )           => IO(() => exec(
                                                `node --max-old-space-size=4096 ${runner} ${mark}`,
                                                (err, stdout, stderr) => trace(stdout)
                                               )
                                             ).run()

// runs a sequence of child processes synchronously
// upon completion of the previous one
// (used to generate a huge amount of contacts)
const generateWithCildIOR = (runner,
                             mark
                            )           => Promise.resolve(nodeProcessIO(runner, mark))
                                              .then((child) => child.on(
                                                  'exit', 
                                                  code => code === 0
                                                                ? generateWithCildIOR(runner, mark + trace(GENERATIONAMOUNT))
                                                                : undefined
                                                )
                                              )
                          
                          generateWithCildIOR('main.js', MARK)
                          