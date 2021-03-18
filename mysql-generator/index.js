const { v4: uuid }        = require('uuid')

const { connection }      = require('./source/utils/db')

const { readBuffer
      , writeBuffer
      , removeBuffer
      }                   = require('./source/utils/buffer')

const { generateContacts
      , generateTelephones
      }                   = require('./source/utils/generators')

const { MINCONTACTSNUMBER
      , MAXCONTACTSNUMBER
      }                   = require('dotenv').config().parsed

const { compose }         = require('lodash/fp')

const TMPPATH             = require('path').join('.', require('os').tmpdir())

const contactsIO          = compose(removeBuffer, generateContacts(MINCONTACTSNUMBER, MAXCONTACTSNUMBER), readBuffer)

const telephonesIO        = compose(writeBuffer(TMPPATH), JSON.stringify, generateTelephones)


module.exports            = { telephonesIO, contactsIO, connection, TMPPATH, uuid }
