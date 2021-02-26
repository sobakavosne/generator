const { generateMatrix, checkDecade }  = require('./source/utils/generator')

const { connection }      = require('./source/utils/db')

const { floor }           = require('lodash')

const { trace
      , fNTimes
      , traceWrap
      , timerWrap
      , fNTimesTCE
      , stringifyMatrix,
      progress
      }                   = require('./source/utils/helpers')

const { getAll
      , insert
      , remove
      , getByID
      , removeAll 
      , insertGen
      , getRowCount
      }                   = require('./source/API/controller.db')
const { compose } = require('lodash/fp')

const { HOST
      , DATABASE
      , PORT
      }                   = require('dotenv').config().parsed

                          connection.connect((e) => e ? trace(e.message) : trace(`\nMySQL DB "${DATABASE}" connect on ${HOST}.\n`))

                          removeAll(connection, 'users')

                          const gens = fNTimes([generateMatrix, [[10000, 13], [6,9], checkDecade(10)]])
                          
                          // gens.map((x, i) => compose(insertGen)([connection, x, i, gens.lengeh]))

                          connection.end((e) => e ? trace(e.message) : trace(`\nMySQL DB "${DATABASE}" disconnected.\n`))
