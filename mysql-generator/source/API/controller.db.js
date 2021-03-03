const { curryRight }      = require('lodash/fp')

const { promisifyAll }    = require('bluebird')

const { errorDB
      , trace
      , putBenchmark
      , shootBenchmark
      , stringifyMatrix
      }                   = require('../utils/helpers')

const { green }           = require('cli-color')

const getAll              = (c)             => c.query('SELECT * FROM users', errorDB)

const getByID             = (c, id)         => c.query(`SELECT * FROM users WHERE id=${id}`, errorDB)

const remove              = (c, id)         => c.query(`DELETE FROM users WHERE yumi_user_id=${id}`, errorDB)

const removeAll           = (c, table)      => c.query(`DELETE FROM ${table}`, errorDB)

const insertGen           = ([c, gen, id])  => new Promise((rs, rj) => { 
                                                                        putBenchmark(id);
                                                                        
                                                                        rs(c.query('INSERT INTO `users` (`yumi_user_id`, `hashtag`, `password`) VALUES'
                                                                          + `${stringifyMatrix(gen)}`,
                                                                          (e, result)  => e ? trace(e.message)
                                                                                              : trace(result.message === ''
                                                                                                ? 'DB cleaned.\n'
                                                                                                  : 'Add generation: ' + green(result.message)
                                                                                                    ) + shootBenchmark(id)
                                                                                                ))
                                                                        })

// const insertGen           = ([c, gen, id])    => new Promise((rs,rj) => {
//                                                   putBenchmark(id);
//                                                   c.query('INSERT INTO `users` (`yumi_user_id`, `hashtag`, `password`) VALUES'
//                                                         + `${stringifyMatrix(gen)}`, 

//                                                   (e, result)  => e ? trace(e.message)
//                                                     : trace(result.message === ''
//                                                       ? 'DB cleaned.\n'
//                                                         : 'Add generation: ' + green(result.message)
//                                                           ) + shootBenchmark(id)
//                                                       )})

const getRowCount         = async (c, table)  => await c.query(`SELECT COUNT(*) FROM ${table}`, errorDB)


module.exports            = { getByID, getAll, remove, insertGen, removeAll, getRowCount }


// c - connection