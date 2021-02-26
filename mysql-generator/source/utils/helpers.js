const Progress            = require('clui').Progress

const { floor }           = require('lodash')

const trace               = (x, y = '') => { console.log(x, y); return x }

const errorDB             = (e, x)      => e ? trace(e.message) : trace(x.message === '' ? 'Removing succeeded.' : x.message)

const asyncTimer          = (q, [y, z]) => { 
                                             const x = Math.random()
                                             console.time(`\nAsync function with hash(${x}) executed in`)
                                             const executed = q(y, z)
                                             return executed.then((x) => console.timeEnd(`\nAsync function with hash(${x}) executed in`))
                                            //  return console.timeEnd(`\nAsync function with hash(${x}) executed in`)
                                           }

const progress            = ([c, x, i, l]) => { trace(new Progress(20).update(floor(i/l, 1))); return [c, x] }

const timerWrap           = (f, arg)    => { 
                                             const x = Math.random(); 
                                             console.time(`\nFunction with hash(${x}) executed in`); 
                                             const executed = f(arg); 
                                             console.timeEnd(`\nFunction with hash(${x}) executed in`);
                                             return executed;
                                           }

const endsWithZero        = (N)         => N % 10 === 0
                                            
const stringifyMatrix     = (x)         => x.map((y) =>`(${y[0]}, '${y[1]}', '${y[2]}')`).toLocaleString()

const fNTimes             = ([f,        // execute fnc N times and write results to the array (avoid N ends with 0)
                              [[a,b],
                               [c,d],
                               N
                              ]
                            ])          => N > 0 && !endsWithZero(N)
                                              ? fNTimes([f, [[a,b], [c,d], N - 1]]).concat([timerWrap(f, [[a,b], [c,d], N])])
                                                : N.toString().length > 1
                                                  ? fNTimes([f, [[a,b], [c,d], N - 1]])
                                                    : []

                          
module.exports            = { trace, errorDB, timerWrap, asyncTimer, stringifyMatrix, fNTimes, progress }