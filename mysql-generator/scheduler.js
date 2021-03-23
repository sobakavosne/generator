const { IO }              = require('monet')

const { exec }            = require('child_process')

const { trace }           = require('./source/utils/helpers')

const { GENERATIONAMOUNT 
      }                   = require('./index')

const nodeProcessIO       = (runner,
                             mark
                            )           => IO(() => exec(
                                                `node --max-old-space-size=4096 ${runner} ${mark}`,
                                                (err, stdout, stderr) => trace(stdout)
                                               )
                                             ).run()

const generateWithCildIO  = (runner,
                             mark
                            )           => Promise.resolve(nodeProcessIO(runner, mark))
                                              .then((child) => child.on(
                                                  'exit', 
                                                  code => code === 0
                                                                ? generateWithCildIO(runner, mark + trace(GENERATIONAMOUNT))
                                                                : undefined
                                                )
                                              )
                          
                          generateWithCildIO('main.js', 0)
                          