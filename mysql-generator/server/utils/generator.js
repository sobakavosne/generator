const { startsWith }      = require("lodash/fp")

const constructPhone      = (x, y, z)   => Number(x.toString().padStart(y, z))

const randomString        = (x)         => Math.random().toString(36).substr(2, x)

const allDigitsAreEqual   = (N)         => [...`${N}`].reduce((acc, x) => acc^x) === (N % 10)

const generateMatrix      = ([[size, telLen],
                              [hashTagLen, psswdLen],
                              start
                            ])          => new Array(size)
                                                .fill(new Array())
                                                .map((_, i) => 
                                                  [
                                                    startsWith(`${start}`, `${i}`)
                                                      ? Math.floor(Math.random() * Math.pow(10, telLen))
                                                      : constructPhone(i, telLen, start),
                                                    randomString(hashTagLen), 
                                                    randomString(psswdLen)
                                                  ])


module.exports            = { generateMatrix }