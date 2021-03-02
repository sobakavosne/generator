const Progress            = require('clui').Progress

const { floor }           = require('lodash')

const trace               = (x)                   => { console.log(x); return x }

const putBenchmark        = (id)                  => id !== undefined ? console.time(`Insertion (${id}) processed in`) : []

const shootBenchmark      = (id)                  => id !== undefined ? console.timeEnd(`Insertion (${id}) processed in`) : []

const errorDB             = (e, r, id, benchFnc)  => e ? trace(e.message)
                                                        : trace(r.message === ''
                                                          ? 'DB cleaned.\n'
                                                            : 'Add generation: ' + r.message
                                                              ) + shootBenchmark(id)
const progress            = ([c, gen, i, l, id])  => {
                                                      const ratio = (i + 1)/l
                                                      const current = new Progress(30).update(floor(ratio, 3))
                                                      ratio !== 1 ? process.stdout.write('\r\033[K' + current) : process.stdout.write('\r\033[K' + current + '\n')
                                                      return [c, gen, id]
                                                     }

const timerWrap           = (f, arg)              => {
                                                      console.time(`Generated in`)
                                                      const executed = f(arg)
                                                      console.timeEnd(`Generated in`)
                                                      return executed
                                                     }

const endsWithZero        = (N)                   => N % 10 === 0
                                            
const stringifyMatrix     = (x)                   => x.map((y) =>`(${y[0]}, '${y[1]}', '${y[2]}')`).toLocaleString()

const fNTimes             = ([f,                  // execute fnc N times and write results to the array (avoid N ends with 0)
                              [[a,b],
                               [c,d],
                               N
                              ]
                            ])                    => N > 0 && !endsWithZero(N)
                                                        ? fNTimes([f, [[a,b], [c,d], N - 1]]).concat([timerWrap(f, [[a,b], [c,d], N])])
                                                          : N.toString().length > 1
                                                            ? fNTimes([f, [[a,b], [c,d], N - 1]])
                                                              : []


module.exports            = { trace, errorDB, timerWrap, stringifyMatrix, fNTimes, progress, putBenchmark, shootBenchmark }