const { spawn } = require('child_process');

function promiseFrom(probe) {
    return new Promise((resolve, reject) => {
        probe.on('data', data => {
            resolve(String(data))
          });
    })
}

async function probe(filename) {
    const ffprobe = spawn('ffprobe', [filename, '-show_format'])
    const fileprobe = await Promise.race([promiseFrom(ffprobe.stdout), promiseFrom(ffprobe.stderr)])
    const duration = fileprobe.match(/duration=([^\n]*)/)
    return parseInt(duration[1], 10)
}

module.exports = probe
