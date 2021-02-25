const { isError, has }     = require("lodash/fp");

const trace           = (x, y = '') => { console.log(x, y); return x }

const errorDB         = (e, x)      => isError(e) ? trace(e.message) : trace(x)

const timerWrap       = (f, arg)    => { 
                                         const x = Math.random(); 
                                         console.time(`\nFunction with hash(${x}) executed in`); 
                                         const result = f(arg); 
                                         console.timeEnd(`\nFunction with hash(${x}) executed in`);
                                         return result;
                                       }

const timerWrapNTimes = ([f, x, N]) => N > 0 ? timerWrap(timerWrapNTimes, [f, x, N - 1]) : f(x)

const stringifyMatrix = (x)         => x.map((y) =>`(${y[0]}, '${y[1]}', '${y[2]}')`).toLocaleString()

const hasZero         = (N)         => has('0', [...`${N}`])

const fNTimes         = ([f, 
                          [[a,b],
                           [c,d],
                           start
                        ]])         => start > 1
                                       ? fNTimes([f, [[a,b], [c,d], start - 1]]).concat([f([[a,b], [c,d], start])]) 
                                       : [f([[a,b], [c,d], start])]


module.exports        = { trace, errorDB, timerWrap, timerWrapNTimes, stringifyMatrix, fNTimes }