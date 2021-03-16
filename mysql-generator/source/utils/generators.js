const L                   = require('lazy.js')

const { noop
      , head
      , random
      }                   = require('lodash/fp')

const { trace
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
                                                  

const generateTelephones  = ()          => noop()

module.exports = { generateContacts, generateTelephones }