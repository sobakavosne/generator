const R                   = require('ramda')

const { IO }              = require('monet')

const { v4: uuid }        = require('uuid')

const { connection }      = require('./source/utils/db')

const { readBufferIO
      , writeBufferIO
      }                   = require('./source/utils/buffer')

const { generateContacts
      , generateTelephones
      }                   = require('./source/utils/generators')

const { N
      , TMPPATH
      , TMPFILE
      , GENNUMBER
      , MINCONTACTSNUMBER
      , MAXCONTACTSNUMBER
      }                   = require('dotenv').config().parsed

const { takeSpecificGen 
      , roundUpToHundreds
      }                   = require('./source/utils/helpers')

const { insertContactsGen
      , insertTelephoneGen
      }                   = require('./source/DB.API/db.controllers')

const GENERATIONAMOUNT    = N/GENNUMBER/roundUpToHundreds(MINCONTACTSNUMBER, MAXCONTACTSNUMBER)

const contactsIO          = R.compose(
                                      x => IO(() => x.map(y => insertContactsGen(connection, y, uuid()))).run(),
                                      generateContacts(R.__, MINCONTACTSNUMBER, MAXCONTACTSNUMBER),
                                      takeSpecificGen(R.__, GENERATIONAMOUNT, process.argv[2]),
                                      readBufferIO
                                     )

const phonesIO            = R.compose(
                                      writeBufferIO(R.__, TMPPATH, TMPFILE),
                                      JSON.stringify,
                                      R.unnest,
                                      x => IO(() => x.map(y => insertTelephoneGen(connection, y, uuid()))).takeRight(IO(() => x)).run(),
                                      generateTelephones
                                     )


module.exports            = { phonesIO, contactsIO, GENERATIONAMOUNT, uuid }
