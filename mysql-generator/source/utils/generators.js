const R                   = require('ramda')

const L                   = require('lazy.js')

const FP                  = require('lodash/fp')

const { endsWithZero
      , trace
      , randomFromRange
      , constructTelRow
      , constructContactRow
      }                   = require('./helpers')

const generateContacts    = (telephones,
                             minContactsNumber, 
                             maxContactsNumber
                            )           => telephones.map(
                                                  row => (L.generate(R.identity)
                                                          .filter(x => !endsWithZero(x))
                                                          .take(FP.random(minContactsNumber, maxContactsNumber))
                                                          .map(id => constructContactRow(R.head(row), id))
                                                          .toArray())
                                                         )

const generateTelephones  = (N,
                             genNumber,
                             telLength,
                             psswdLength,
                             hashTagLength
                            )           => R.splitEvery(N/genNumber,
                                                        L.generate(R.identity)
                                                         .filter(x => !endsWithZero(x) && x !== 1)
                                                         .map(id => constructTelRow(telLength, psswdLength, hashTagLength, id))
                                                         .take(N)
                                                         .toArray()
                                                       )


module.exports = { generateContacts: R.curry(generateContacts), generateTelephones }