const L                   = require('lazy.js')

const { noop
      , head
      , chunk
      , random
      }                   = require('lodash/fp')

const { trace
      , checkDecade
      , endsWithZero
      , constructContactRow
      }                   = require('./helpers')

const generateContacts    = (N,
                             telCollection,
                             [minContactsNumber, 
                              maxContactsNumber
                             ]
                            )           => chunk(N, telCollection.map(
                                            gen => gen.map(
                                              row => L.generate(x => x)
                                                      .take(checkDecade(random(minContactsNumber, maxContactsNumber)))
                                                      .filter(x => !endsWithZero(x))
                                                      .toArray()
                                                      .map(contactIndex => trace(constructContactRow(head(row), contactIndex)))
                                                      )
                                                    )
                                                  )

const generateTelephones  = ()          => noop()

module.exports = { generateContacts, generateTelephones }