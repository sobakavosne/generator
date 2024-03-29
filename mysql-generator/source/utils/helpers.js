const R                   = require('ramda')

const L                   = require('lazy.js')

const { IO }              = require('monet')

const { green }           = require('cli-color')

const trace               = (x)         => IO(() => console.log(x)).takeRight(IO(() => x)).run()

const rndmString          = (x)         => Math.random().toString(36).substr(2, x)

const checkDecade         = (N)         => endsWithZero(N) ? N + checkDecade(N/10) : N + 1

const endsWithZero        = (N)         => N % 10 === 0

const putBenchmark        = (id)        => R.isNil(id) ? [] : console.time(`Action (${id}) processed in`)

const shootBenchmark      = (id)        => R.isNil(id) ? [] : console.timeEnd(`Action (${id}) processed in`)

const insertGenError      = (id,
                             error,
                             result
                            )           => trace(error ? error.message : 'Add generation: ' + green(result.message))
                                           + shootBenchmark(id)

const removeTableError    = (error,
                             result,
                             id
                            )           => error ? trace(error.message)
                                                  : result.message === ''
                                                    ? trace('DB cleaned.\n') 
                                                      : trace('Add generation: ' + result.message)
                                          + shootBenchmark(id)

const constructContact    = (telIndex,
                             telephone,
                             contactIndex
                            )           => telIndex.concat(contactIndex.toString().padStart(
                                                      telephone.toString().length - telIndex.length, 0
                                                    )
                                                  )

const takeSpecificGen     = (matrix,
                             genAmount,
                             matrixMark
                            )           => R.props(
                                                   L.generate(R.identity).dropWhile(x => x < matrixMark).take(genAmount).toArray(),
                                                   matrix
                                                  )

const emitSignificantID   = (value)     => value.toString().replace(/[1-9]+[0]*/, '')

const roundUpToHundreds   = (...xs)     => Math.round((R.sum(xs) / xs.length) / 100) * 100

const stringifyTelMatrix  = (matrix)    => matrix.map((x) =>`(${x[0]}, '${x[1]}', '${x[2]}')`).toLocaleString()

const stringifyContMatrix = (matrix)    => matrix.map((x) =>`(${x[0]}, '${x[1]}')`).toLocaleString()

const constructTelQuery   = (gen)       => 'INSERT INTO `users` (`yumi_user_id`, `hashtag`, `password`) VALUES'
                                           + `${stringifyTelMatrix(gen)}`

const constructContQuery  = (gen)       => 'INSERT INTO `contacts` (`yumi_user_id`, `contact_user_id`) VALUES'
                                           + `${stringifyContMatrix(gen)}`

const constructSelect     = (yumi_user_id
                            )           => 'SELECT `id`, `contact_user_id` FROM `contacts` WHERE `yumi_user_id`='
                                           + `${yumi_user_id}`

const constructTelRow     = (telLength,
                             psswdLength,
                             hashTagLength,
                             initialIdentity
                            )           => [Number('1'.concat(initialIdentity.toString().padStart(telLength - 1, 0))),
                                            rndmString(hashTagLength),
                                            rndmString(psswdLength)
                                           ]

const constructContactRow = (telephone,
                             contactIndex
                            )           => R.compose(
                                                     contact => [telephone, contact],
                                                     Number,
                                                     R.curry(constructContact)(R.__, telephone, contactIndex),
                                                     emitSignificantID
                                                    )(telephone)


module.exports            = { trace
                            , rndmString
                            , checkDecade
                            , putBenchmark
                            , endsWithZero
                            , shootBenchmark
                            , constructTelRow
                            , constructSelect
                            , removeTableError
                            , roundUpToHundreds
                            , constructTelQuery
                            , constructContQuery
                            , constructContactRow
                            , insertGenError: R.curry(insertGenError)
                            , takeSpecificGen: R.curry(takeSpecificGen)
                            }
