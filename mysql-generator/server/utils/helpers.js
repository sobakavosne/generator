const { isError }     = require("lodash/fp");

const trace           = (x, y = '') => { console.log(x, y); return x }

const errorDB         = (e, x)      => isError(e) ? trace(e.message) : trace(x)

const timerWrap       = (f, arg)    => { 
                                         const x = Math.random(); 
                                         console.time(`\nFunction with hash(${x}) executed in`); 
                                         f(arg); 
                                         console.timeEnd(`\nFunction with hash(${x}) executed in`);
                                       }

const timerWrapNTimes = ([f, x, N]) => N > 0 ? timerWrap(timerWrapNTimes, [f, x, N - 1]) : f(x)

const stringifyMatrix = (x)         => x.map((y) =>`(${y[0]}, '${y[1]}', '${y[2]}')`).toLocaleString()

// const fNTimes         = (f, x, N)   => N >= 1 ? fNTimes(f, N - 1) : f(x)


module.exports        = { trace, errorDB, timerWrap, timerWrapNTimes, stringifyMatrix, fNTimes }