const R                   = require('ramda')

const { IO }              = require('monet')

const { join }            = require('path')

const { rmSync
      , mkdirSync
      , existsSync
      , readFileSync
      , writeFileSync
      }                   = require('fs')

const writeBufferIO       = (writable,
                             tmpPath,
                             tmpFile
                            )           => IO(() => existsSync(tmpPath) ? undefined : mkdirSync(tmpPath))
                                            .takeRight(
                                              IO(() => writeFileSync(join(tmpPath, tmpFile), writable, (e) => e ? e : undefined))
                                            )

const readBufferIO        = (tmpPath,
                             tmpFile
                            )           => IO(() => R.compose(R.values, JSON.parse, readFileSync)(join(tmpPath, tmpFile))).run()

const removeBufferIO      = (tmpPath)   => IO(() => rmSync(tmpPath, { recursive: true }))


module.exports            = { writeBufferIO : R.curry(writeBufferIO), readBufferIO, removeBufferIO }
