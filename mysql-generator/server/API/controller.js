const { errorDB }     = require('../utils/helpers')

const get             = (c, id)     => c.query(`SELECT * FROM users WHERE id=${id}`, errorDB)

const getAll          = (c)         => c.query('SELECT * FROM users', errorDB)

const insert          = (c, value)  => c.query('INSERT INTO `users` (`yumi_user_id`, `hashtag`, `password`) VALUES' + value, 
                                                errorDB
                                              )

const remove          = (c, id)     => c.query( `DELETE FROM users WHERE yumi_user_id=${id}`, errorDB)

const insertGen       = (c, f, x)   => c.query('INSERT INTO `users` (`yumi_user_id`, `hashtag`, `password`) VALUES' + `${f(x)}`)


module.exports        = { get, getAll, insert, remove, generate: insertGen }