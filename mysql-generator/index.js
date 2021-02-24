const app                 = require('express')()

const { isError, head }   = require('lodash/fp')

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
      , insertGen
      }                   = require('./server/API/controller')

const { HOST
      , DATABASE
      , PORT
      }                   = require('dotenv').config().parsed

                          app.listen(() => trace('\nServer listening on port ' + PORT))

                          // connection.connect((x) => isError(x) ? trace(x.message) : trace(`\nMySQL DB "${DATABASE}" connect on ${HOST}\n`))

                          // removeAll(connection, 'users')

                          // const gens = fNTimes(generateMatrix, [[10, 13], [6,9], 1], 9)

                          trace(gens)

                          // timerWrap(insertGen, [connection, g1])
                          // timerWrap(insertGen, [connection, generateMatrix, [[1000000, 13], [6,9], 2]])
                          // timerWrap(insertGen, [connection, generateMatrix, [[1000000, 13], [6,9], 3]])
                          // timerWrap(insertGen, [connection, generateMatrix, [[1000000, 13], [6,9], 4]])
                          // timerWrap(insertGen, [connection, generateMatrix, [[1000000, 13], [6,9], 5]])
                          // timerWrap(insertGen, [connection, generateMatrix, [[1000000, 13], [6,9], 6]])
                          // timerWrap(insertGen, [connection, generateMatrix, [[1000000, 13], [6,9], 7]])
                          // timerWrap(insertGen, [connection, generateMatrix, [[1000000, 13], [6,9], 8]])
                          // timerWrap(insertGen, [connection, generateMatrix, [[1000000, 13], [6,9], 9]])


                          