const { isError }     = require("lodash/fp");

const trace           = (x)         => { console.log(x); return x }

const errorDB         = (e, x)      => isError(e) ? trace(e.message) : trace(x)


module.exports        = { trace, errorDB }