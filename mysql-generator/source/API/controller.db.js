const { trace
      , errorDB
      , putBenchmark
      , shootBenchmark
      , stringifyMatrix
      }                   = require('../utils/helpers')

const { green }           = require('cli-color')

const removeAll           = (c, table)      => c.query(`DELETE FROM ${table}`, errorDB)

const insertGen           = ([c, gen, id])  => new Promise((rs, rj) => { 
                                                                        putBenchmark(id);
                                                                        
                                                                        rs(c.query('INSERT INTO `users` (`yumi_user_id`, `hashtag`, `password`) VALUES'
                                                                          + `${stringifyMatrix(gen)}`,
                                                                          (e, result)  => e ? trace(e.message)
                                                                                            : trace('Add generation: ' 
                                                                                                + green(result.message)) 
                                                                                                + shootBenchmark(id)
                                                                                              ))
                                                                        })


module.exports            = { insertGen, removeAll }


// c - connection