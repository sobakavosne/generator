const { HOST
      , DATABASE
      }                   = require('dotenv').config().parsed

const { uuid }            = require('./index')

const { trace }           = require('./source/utils/helpers')

const { connection }      = require('./source/utils/db')

const { getContactsByID } = require('./source/DB.API/db.controllers')

const YUMI_USER_ID        = 1000000000005

                          connection.connect((e) => e ? trace(e.message) : trace(`\nMySQL DB "${DATABASE}" connect on ${HOST}.\n`))
                          
                          console.time(`\nUser contacts with yumi_user_id ${YUMI_USER_ID} obtained in`)
      
                          getContactsByID(connection, YUMI_USER_ID, uuid())

                          console.timeEnd(`\nUser contacts with yumi_user_id ${YUMI_USER_ID} obtained in`)

                          connection.end((e) => e ? trace(e.message) : trace(`\nMySQL DB "${DATABASE}" disconnected.\n`))
