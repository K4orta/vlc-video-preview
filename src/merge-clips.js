const { spawn } = require('child_process')
const fs = require('fs')
const { sep } = require('path')

function makeManifest(clips, workDir) {
    return new Promise(resolve => {
        const out = clips.map(line => `file '${line}'`)
        fs.writeFile(`${workDir}${sep}manifest.txt`, out.join('\n'), resolve)
    })
}

async function mergeClips(clips, workDir, destDir) {
    await makeManifest(clips, workDir)
  return new Promise(resolve => {
    const proc = spawn('ffmpeg', [
        '-f',
        'concat',
        '-safe',
        '0',
        '-y',
        '-i',
        `${workDir}${sep}manifest.txt`,
        '-c',
        'copy',
        `${destDir}${sep}output.mp4`
    ])
    proc.on('close', resolve)
    proc.stderr.on('data', data => console.log(String(data)))
  })
}

module.exports = mergeClips
