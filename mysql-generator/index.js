const { generateMatrix
      , checkDecade 
      }                   = require('./source/utils/generator')

const { connection }      = require('./source/utils/db')

const { v4: uuid }        = require('uuid')

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

const insertMarkedGen     = compose(insertGen, progress)

                          trace('\n')

                          const gens = fNTimes([generateMatrix, [[100000, TELLENGTH], [HASHTAGLENGTH, PSSWDLENGTH], checkDecade(10)]])
                          
                          connection.connect((e) => e ? trace(e.message) : trace(`\nMySQL DB "${DATABASE}" connect on ${HOST}.\n`))
                          
                          removeAll(connection, 'users')
                          
                          trace('\nSending generations to MySQL.\n')
                          
                          gens.map((gen, i) => insertMarkedGen([connection, gen, i, gens.length, uuid()]))
                          
                          trace('\nNode.js finished the work.')
                          
                          connection.end((e) => e ? trace(e.message) : trace(`\nMySQL DB "${DATABASE}" disconnected.\n`))
