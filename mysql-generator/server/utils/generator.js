const { startsWith
      , random 
      }                   = require("lodash/fp")

const constructPhone      = (x, y, z)   => Number(z + x.toString().padStart(y - z.toString().length, 0))

const randomString        = (x)         => Math.random().toString(36).substr(2, x)

const allDigitsAreEqual   = (x)         => [...`${x}`].reduce((acc, x) => acc^x) === (x % 10)

const generateMatrix      = ([[size, telLen],
                              [hashTagLen, psswdLen],
                              N
                            ])          => new Array(size)
                                                .fill(new Array())
                                                .map((_, i) => 
                                                  [
                                                    constructPhone(i, telLen, N),
                                                    randomString(hashTagLen), 
                                                    randomString(psswdLen)
                                                  ])


module.exports            = { generateMatrix }