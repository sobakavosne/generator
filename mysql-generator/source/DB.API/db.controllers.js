const { trace
      , putBenchmark
      , shootBenchmark
      , insertGenError
      , removeTableError
      , constructTelQuery
      , constructContQuery
      }                   = require('../utils/helpers')

const { IO }              = require('monet')

const { green }           = require('cli-color')

const removeAll           = (connection,
                             table
                            )           => connection.query(`DELETE FROM ${table}`, removeTableError)

// const insertTelephoneGen  = (connection,
//                              generation,
//                              id
//                             )           => IO(() => connection.connect((e) => e ? trace(e.message) : trace(`\nMySQL DB "${DATABASE}" connect on ${HOST}.\n`)))
//                                             .takeRight(IO(() => putBenchmark(id)).run()
//                                                .takeRight(IO(() => connection.query(constructTelQuery(generation), insertGenError(id))).run()
//                                                    .takeRight(IO(() => connection.end((e) => e ? trace(e.message) : trace(`\nMySQL DB "${DATABASE}" disconnected.\n`))).run()
//                                                    )
//                                                     .bind(() => IO(() => generation)).run()
//                                                  )
//                                               )

// const insertContactsGen   = (connection,
//                              generation,
//                              id
//                             )           => IO(
//                                               () => putBenchmark(id)
//                                              )
//                                             .takeRight(
//                                               IO(
//                                                  () => connection.query(constructContQuery(generation), insertGenError(id))
//                                                 )
//                                               )

const insertContactsGen   = (connection,
                             generation, 
                             id
                            )           => new Promise((rs, rj) => {
                                                                    // connection.connect((e) => e ? trace(e.message) : trace(`\n\nMySQL DB "${DATABASE}" connect on ${HOST}.\n`))
                                                                    
                                                                    putBenchmark(id);
                                                                    
                                                                    rs(connection.query(
                                                                      constructContQuery(generation),
                                                                      (e, result)  => e ? trace(e.message)
                                                                                        : trace('Add Contacts generation: ' 
                                                                                            + green(result.message)) 
                                                                                            + shootBenchmark(id)
                                                                                            // + connection.end((e) => e ? trace(e.message) : trace(`\nMySQL DB "${DATABASE}" disconnected.\n`))
                                                                                          ))
                                                                   })

const insertTelephoneGen  = (connection,
                             generation, 
                             id
                            )           => new Promise((rs, rj) => {
                                                                    // connection.connect((e) => e ? trace(e.message) : trace(`\n\nMySQL DB "${DATABASE}" connect on ${HOST}.\n`))
                          
                                                                    putBenchmark(id);
                                                                    
                                                                    rs(connection.query(
                                                                      constructTelQuery(generation),
                                                                      (e, result)  => e ? trace(e.message)
                                                                                        : trace('Add Phone generation: ' 
                                                                                            + green(result.message)) 
                                                                                            + shootBenchmark(id)
                                                                                            // + connection.end((e) => e ? trace(e.message) : trace(`\nMySQL DB "${DATABASE}" disconnected.\n`))
                                                                                          ))
                                                                   })


module.exports            = { insertTelephoneGen, insertContactsGen, removeAll }
