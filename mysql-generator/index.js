const { v4: uuid }        = require('uuid')

const { readBufferIO
      , writeBufferIO
      , removeBufferIO
      }                   = require('./source/utils/buffer')

const { generateContacts
      , generateTelephones
      }                   = require('./source/utils/generators')

const { TMPPATH
      , TMPFILE
      , MINCONTACTSNUMBER
      , MAXCONTACTSNUMBER
      }                   = require('dotenv').config().parsed

const R                   = require('ramda')

const { trace }           = require('./source/utils/helpers')

const { removeAll 
      , insertContactsGen
      , insertTelephoneGen
      }                   = require('./source/DB.API/db.controllers')

const { connection }      = require('./source/utils/db')

const { IO }              = require('monet')

const contactsIO          = R.compose(
                                      x => IO(() => x.map(y => insertContactsGen(connection, y, uuid()))).takeRight(IO(() => x)).run(),
                                      generateContacts(R.__, MINCONTACTSNUMBER, MAXCONTACTSNUMBER),
                                      readBufferIO
                                     )

const telephonesIO        = R.compose(
                                      writeBufferIO(R.__, TMPPATH, TMPFILE),
                                      JSON.stringify,
                                      R.unnest,
                                      x => IO(() => x.map(y => insertTelephoneGen(connection, y, uuid()))).takeRight(IO(() => x)).run(),
                                      generateTelephones
                                     )


module.exports            = { telephonesIO, contactsIO, TMPPATH, TMPFILE, uuid }
