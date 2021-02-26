const Progress            = require('clui').Progress

const { floor }           = require('lodash')

const trace               = (x, y = '')     => { console.log(x, y); return x }

const errorDB             = (e, x)          => e ? trace(e.message) : trace(x.message === '' ? 'DB cleaned.\n' : 'Add the chunk: ' + x.message)

// const asyncTimer          = ([q, y, z])     => { 
//                                                  const x = floor(Math.random(), 4)
//                                                  console.time(`\nAsync function with hash(${x}) executed in`)
//                                                  const executed = q(y, z)
//                                                  return executed.then((x) => console.timeEnd(`\nAsync function with hash(${x}) executed in`))
//                                                 //  return console.timeEnd(`\nAsync function with hash(${x}) executed in`)
//                                                }

const progress            = ([c, x, i, l])  => { trace(new Progress(30).update(floor((i + 1)/l, 3))); return [c, x] }

const timerWrap           = (f, arg)        => { 
                                                 console.time(`Generated in`)
                                                 const executed = f(arg)
                                                 console.timeEnd(`Generated in`)
                                                 return executed
                                               }

const endsWithZero        = (N)             => N % 10 === 0
                                            
const stringifyMatrix     = (x)             => x.map((y) =>`(${y[0]}, '${y[1]}', '${y[2]}')`).toLocaleString()

const fNTimes             = ([f,            // execute fnc N times and write results to the array (avoid N ends with 0)
                              [[a,b],
                               [c,d],
                               N
                              ]
                            ])              => N > 0 && !endsWithZero(N)
                                                  ? fNTimes([f, [[a,b], [c,d], N - 1]]).concat([timerWrap(f, [[a,b], [c,d], N])])
                                                    : N.toString().length > 1
                                                      ? fNTimes([f, [[a,b], [c,d], N - 1]])
                                                        : []

                          
module.exports            = { trace, errorDB, timerWrap, stringifyMatrix, fNTimes, progress }