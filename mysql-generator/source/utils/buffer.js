const { IO }              = require('monet')

const { noop
      , curryRight
      }                   = require('lodash/fp')

const { join }            = require('path')

const { rmSync
      , mkdirSync
      , writeFile
      , existsSync
      , readFileSync
      }                   = require('fs')

const writeBuffer         = (writable,
                             tmpPath
                            )           => IO(
                                              () => existsSync(tmpPath)
                                                      ? noop()
                                                      : mkdirSync(tmpPath)
                                             )
                                            .takeRight(
                                              IO(
                                                 () => writeFile(
                                                   join(tmpPath, 'buffer.txt'), 
                                                   writable, 
                                                   (e) => e ? trace(e) : null)
                                                )
                                              )

const readBuffer          = (tmpPath)   => IO(() => readFileSync(tmpPath))

const removeBuffer        = (tmpPath)  => IO(() => rmSync(tmpPath, { recursive: true }))


module.exports            = { writeBuffer : curryRight(writeBuffer), readBuffer, removeBuffer }