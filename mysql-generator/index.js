const { generateMatrix
      , checkDecade 
      }                   = require('./source/utils/generator')

const { connection }      = require('./source/utils/db')

const { trace
      , fNTimes
      , progress
      }                   = require('./source/utils/helpers')

const { removeAll 
      , insertGen
      }                   = require('./source/API/controller.db')

const { compose }         = require('lodash/fp')

const { HOST
      , DATABASE
      , TELLENGTH
      , PSSWDLENGTH
      , HASHTAGLENGTH
      }                   = require('dotenv').config().parsed

                          connection.connect((e) => e ? trace(e.message) : trace(`\nMySQL DB "${DATABASE}" connect on ${HOST}.\n`))

                          removeAll(connection, 'users')
                          
                          const gens = fNTimes([generateMatrix, [[1000000, TELLENGTH], [HASHTAGLENGTH, PSSWDLENGTH], 10]])

                          trace('\n')
                          
                          gens.map((x, i) => compose(insertGen, progress)([connection, x, i, gens.length]))

                          trace('\nNode.js finished the work.')

                          connection.end((e) => e ? trace(e.message) : trace(`\nMySQL DB "${DATABASE}" disconnected.\n`))
