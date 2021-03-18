const L                   = require('lazy.js')

const { head
      , chunk
      , random
      , curryRight
      , isUndefined
      }                   = require('lodash/fp')

const { rndmString
      , endsWithZero
      , constructContactRow
      }                   = require('./helpers')

const generateContacts    = (telCollection,
                             minContactsNumber, 
                             maxContactsNumber
                            )           => telCollection.map(
                                            gen => gen.map(
                                              row => L.generate(x => x)
                                                      .filter(x => !endsWithZero(x))
                                                      .take(random(minContactsNumber, maxContactsNumber))
                                                      .map(contactIndex => constructContactRow(head(row), contactIndex))
                                                      .toArray()
                                                      )
                                                    ).reduce((acc, x) => acc.concat(x))

const generateTelephones  = (N,
                             genNumber,
                             telLength,
                             psswdLength,
                             hashTagLength
                            )           => chunk(N/genNumber,
                                                 L.generate(x => endsWithZero(x)
                                                                  ? undefined
                                                                  : [Number('1'.concat(x.toString().padStart(telLength - 1, 0))),
                                                                     rndmString(hashTagLength),
                                                                     rndmString(psswdLength)
                                                                    ]
                                                            )
                                                  .filter(x => !isUndefined(x))
                                                  .take(N)
                                                  .toArray()
                                                )


module.exports = { generateContacts: curryRight(generateContacts), generateTelephones }