const { errorDB
      , stringifyMatrix
      }                   = require('../utils/helpers')

const getAll              = async (c)             => await c.query('SELECT * FROM users', errorDB)

const getByID             = async (c, id)         => await c.query(`SELECT * FROM users WHERE id=${id}`, errorDB)

const remove              = async (c, id)         => await c.query(`DELETE FROM users WHERE yumi_user_id=${id}`, errorDB)

const removeAll           = async (c, table)      => await c.query(`DELETE FROM ${table}`, errorDB)

const insertGen           = async ([c, gen, id, b])  => [
                                                         await c.query('INSERT INTO `users` (`yumi_user_id`, `hashtag`, `password`) VALUES'
                                                           + `${stringifyMatrix(gen)}`, errorDB),
                                                         id,
                                                         b
                                                        ]

const getRowCount         = async (c, table)      => await c.query(`SELECT COUNT(*) FROM ${table}`, errorDB)


module.exports            = { getByID, getAll, remove, insertGen, removeAll, getRowCount }


// c - connection