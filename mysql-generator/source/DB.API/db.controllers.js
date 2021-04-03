const { trace
      , putBenchmark
      , shootBenchmark
      , constructSelect
      , removeTableError
      , constructTelQuery
      , constructContQuery
      }                   = require('../utils/helpers')

const { green }           = require('cli-color')

const removeAll           = (connection,
                             table
                            )           => connection.query(`DELETE FROM ${table}`, removeTableError)

const getContactsByID     = (connection,
                             yumi_user_id,
                             id
                            )           => new Promise((rs, rj) => {
                                                                    putBenchmark(id);
                                                                    
                                                                    rs(connection.query(
                                                                      constructSelect(yumi_user_id),
                                                                      (e, result)  => e ? trace(e.message)
                                                                                        : trace(`Select contacts ${yumi_user_id}: ` 
                                                                                              + green(result.message)) 
                                                                                            + shootBenchmark(id)
                                                                                            ))
                                                                   })
                                            .then(result => trace(result))
                                            .catch(reason => trace(reason))

const insertContactsGen   = (connection,
                             generation, 
                             id
                            )           => new Promise((rs, rj) => {
                                                                    putBenchmark(id);
                                                                    
                                                                    rs(connection.query(
                                                                      constructContQuery(generation),
                                                                      (e, result)  => e ? trace(e.message)
                                                                                        : trace('Add Contacts generation: ' 
                                                                                              + green(result.message)) 
                                                                                            + shootBenchmark(id)
                                                                                          ))
                                                                   })

const insertTelephoneGen  = (connection,
                             generation, 
                             id
                            )           => new Promise((rs, rj) => {
                                                                    putBenchmark(id);
                                                                    
                                                                    rs(connection.query(
                                                                      constructTelQuery(generation),
                                                                      (e, result)  => e ? trace(e.message)
                                                                                        : trace('Add Phone generation: ' 
                                                                                              + green(result.message)) 
                                                                                            + shootBenchmark(id)
                                                                                          ))
                                                                   })


module.exports            = { insertTelephoneGen, insertContactsGen, getContactsByID, removeAll }
