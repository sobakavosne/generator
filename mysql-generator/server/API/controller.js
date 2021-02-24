const { errorDB
      , stringifyMatrix
      }                   = require('../utils/helpers')

const get                 = async (c, id)     => await c.query(`SELECT * FROM users WHERE id=${id}`, errorDB)

const getAll              = async (c)         => await c.query('SELECT * FROM users', errorDB)

const insert              = async ([c, val])  => await c.query('INSERT INTO `users` (`yumi_user_id`, `hashtag`, `password`) VALUES' + 
                                                                val, errorDB
                                                              )

const remove              = async (c, id)     => await c.query(`DELETE FROM users WHERE yumi_user_id=${id}`, errorDB)

const removeAll           = async (c, table)  => await c.query(`DELETE FROM ${table}`, errorDB)

const insertGen           = async ([c, gen])  => await c.query('INSERT INTO `users` (`yumi_user_id`, `hashtag`, `password`) VALUES' + 
                                                               `${stringifyMatrix(gen)}`, errorDB
                                                              )

const getRowCount         = async (c, table)  => await c.query(`SELECT COUNT(*) FROM ${table}`)


module.exports            = { get, getAll, insert, remove, insertGen, removeAll, getRowCount }


// c - connection