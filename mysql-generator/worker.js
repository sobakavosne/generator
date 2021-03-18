const { trace } = require('./source/utils/helpers')

const { exec } = require('child_process')

// dir = exec("ls -a", (err, stdout, stderr) => trace(stdout))

// dir.on('exit', (code) => trace(code))

new Promise((rs, rj) => setTimeout(() => rs(exec("ls -a", (err, stdout, stderr) => trace(stdout))), 1000))
  .then((dir) => dir.on('exit', (code) => setTimeout(() => trace(code), 1000)))
