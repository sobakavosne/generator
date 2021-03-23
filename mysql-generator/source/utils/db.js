const mysql           = require('mysql')

const { HOST
      , USER
      , PSSWD
      , DATABASE
      }               = require('dotenv').config().parsed

const connection      = mysql.createConnection({ host: HOST, user: USER, password: PSSWD, database: DATABASE, connectTimeout: 100000000 })


module.exports        = { connection }
