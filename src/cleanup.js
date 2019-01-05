const { spawn } = require('child_process')

module.exports = workDir => {
    spawn('rm', [ '-rf', workDir ])
}