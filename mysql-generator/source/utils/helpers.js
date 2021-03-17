const { compose
      , curryRight
      , isUndefined
      }                   = require('lodash/fp')

const trace               = (x)         => { console.log(x); return x }

const rndmString          = (x)         => Math.random().toString(36).substr(2, x)

const checkDecade         = (N)         => endsWithZero(N)
                                            ? N + checkDecade(N/10)
                                            : N + 1

const endsWithZero        = (N)         => N % 10 === 0

const putBenchmark        = (id)        => isUndefined(id) ? [] : console.time(`Insertion (${id}) processed in`)

const shootBenchmark      = (id)        => isUndefined(id) ? [] : console.timeEnd(`Insertion (${id}) processed in`)

const dataBaseError       = (e, r, id)  => e ? trace(e.message)
                                              : trace(r.message === ''
                                                ? 'DB cleaned.\n'
                                                  : 'Add generation: ' + r.message
                                                    ) + shootBenchmark(id)

const extractTelIndex     = (telephone) => telephone.toString().replace(/[1-9]+[0]*/, '')

const constructContact    = (telIndex,
                             telephone,
                             contactIndex
                            )           => telIndex.concat(contactIndex.toString().padStart(
                                                      telephone.toString().length - telIndex.length, 0
                                                    )
                                                  )

const stringifyTelMatrix  = (matrix)    => matrix.map((y) =>`(${y[0]}, '${y[1]}', '${y[2]}')`).toLocaleString()

const stringifyContMatrix = (matrix)    => matrix.map((y) =>`(${y[0]}, '${y[1]}')`).toLocaleString()

const constructContactRow = (telephone,
                             contactIndex
                            )           => compose(
                                                   x => [telephone, x],
                                                   Number,
                                                   curryRight(constructContact)(telephone, contactIndex),
                                                   extractTelIndex
                                                  )(telephone)

module.exports            = { trace
                            , rndmString
                            , checkDecade
                            , putBenchmark
                            , endsWithZero
                            , dataBaseError
                            , shootBenchmark
                            , extractTelIndex
                            , stringifyTelMatrix
                            , stringifyContMatrix
                            , constructContactRow
                            }
