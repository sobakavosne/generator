const { reverse
      , tail, 
      compose
      }                   = require('lodash/fp')

const constructPhone      = (x, y, z)   => Number(z + x.toString().padStart(y - z.toString().length, 0))

const rndmString          = (x)         => Math.random().toString(36).substr(2, x)

const checkDecade         = (N)         => N + Number(compose(reverse, tail, reverse)([...`${N}`]).join(''))

const generateMatrix      = ([[size, telLen],
                              [hashTagLen, psswdLen],
                              N
                            ])          => new Array(size)
                                                .fill(new Array())
                                                .map((_, i) => 
                                                  [constructPhone(i, telLen, N), rndmString(hashTagLen), rndmString(psswdLen)]
                                                )


module.exports            = { generateMatrix, checkDecade }