const mysql           = require('mysql')

const { HOST
      , USER
      , PSSWD
      , DATABASE
      , PORT
      }               = require('dotenv').config().parsed

const connection      = mysql.createConnection({ host: HOST, user: USER, password: PSSWD, database: DATABASE })


module.exports        = { connection }
