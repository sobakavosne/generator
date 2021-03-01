const Progress            = require('clui').Progress

const { floor }           = require('lodash')

const trace               = (x)                       => { console.log(x); return x }

const errorDB             = (e, x)                    => e ? trace(e.message)
                                                            : trace(x.message === ''
                                                              ? 'DB cleaned.\n'
                                                                : 'Add generation: ' + x.message
                                                                  )

const shootBenchmarkA     = async ([promise, id, b])  => promise.then((rs, rj) => rs(console.timeEnd(`Insertion (${id}) processed in`)))

const putBenchmarkA       = ([c, x, i, l, id])        => {
                                                          console.time(`Insertion (${id}) processed in`)
                                                          return [c, x, i, l, id]
                                                         }

const progress            = ([c, x, i, l, id, b])  => {
                                                          const ratio = (i + 1)/l;
                                                          const current = new Progress(30).update(floor(ratio, 3));
                                                          ratio !== 1 ? process.stdout.write('\r\033[K' + current) : process.stdout.write('\r\033[K' + current + '\n');
                                                          return [c, x, id, b];
                                                         }

const timerWrap           = (f, arg)                  => {
                                                          console.time(`Generated in`)
                                                          const executed = f(arg)
                                                          console.timeEnd(`Generated in`)
                                                          return executed
                                                         }

const endsWithZero        = (N)                       => N % 10 === 0
                                            
const stringifyMatrix     = (x)                       => x.map((y) =>`(${y[0]}, '${y[1]}', '${y[2]}')`).toLocaleString()

const fNTimes             = ([f,            // execute fnc N times and write results to the array (avoid N ends with 0)
                              [[a,b],
                               [c,d],
                               N
                              ]
                            ])                        => N > 0 && !endsWithZero(N)
                                                            ? fNTimes([f, [[a,b], [c,d], N - 1]]).concat([timerWrap(f, [[a,b], [c,d], N])])
                                                              : N.toString().length > 1
                                                                ? fNTimes([f, [[a,b], [c,d], N - 1]])
                                                                  : []

                          
module.exports            = { trace, errorDB, timerWrap, stringifyMatrix, fNTimes, progress, putBenchmarkA, shootBenchmarkA }