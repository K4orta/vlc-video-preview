const { spawn } = require('child_process')

function makeDir (name) {
  return new Promise(resolve => {
    const proc = spawn('mkdir', [ name ])
    proc.on('close', resolve)
  })
}

module.exports = makeDir
