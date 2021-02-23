const app             = require('express')()

const { isError }     = require('lodash/fp')

const { connection }  = require('./server/utils/db')

const { trace }       = require('./server/utils/helpers')

const { get
      , getAll
      , insert
      , remove 
      }               = require('./server/API/controller')

const { HOST
      , USER
      , PSSWD
      , DATABASE
      , PORT
      }               = require('dotenv').config().parsed

                      app.listen(() => trace('Server listening on port ' + PORT))

                      connection.connect((x) => isError(x) ? trace(x.message) : trace(`MySQL DB "${DATABASE}" connect on ${HOST}`)
                      )

                      // insert(connection, "(9999941152336, '3AixHH', 'koBlPhRR3')")
                      
                      // remove(connection, 9999941152336)
                      