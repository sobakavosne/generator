const { trace } = require('./source/utils/helpers')

const { exec } = require('child_process')

dir = exec("ls -la", (err, stdout, stderr) => trace(stdout))

dir.on('exit', (code) => trace(code))