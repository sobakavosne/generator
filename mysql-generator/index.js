const app                 = require('express')()

const { isError, head, has }   = require('lodash/fp')

const { generateMatrix }  = require('./server/utils/generator')

const { connection }      = require('./server/utils/db')

const { trace
      , timerWrap
      , timerWrapNTimes
      , stringifyMatrix
      , fNTimes
      }                   = require('./server/utils/helpers')

const { get
      , getAll
      , insert
      , remove
      , removeAll 
      , insertGen,
      getRowCount
      }                   = require('./server/API/controller.db')

const { HOST
      , DATABASE
      , PORT
      }                   = require('dotenv').config().parsed

                          app.listen(() => trace('\nServer listening on port ' + PORT))

                          connection.connect((x) => isError(x) ? trace(x.message) : trace(`\nMySQL DB "${DATABASE}" connect on ${HOST}\n`))

                          removeAll(connection, 'users')

                          // const gens = timerWrap(fNTimes, [generateMatrix, [[1000000, 13], [6,9], 9]])

                          // gens.map((x) => timerWrap(insertGen, [connection, x]))
                          
                          // const gen = generateMatrix([[1000000, 13], [6,9], 11])

                          // insertGen([connection, gen])
                          


                          