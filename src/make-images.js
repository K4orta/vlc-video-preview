const { spawn } = require('child_process')
const { sep } = require('path')

function makeImages ({ input, start, duration, segment, workDir }) {
  return new Promise(resolve => {
    const proc = spawn('vlc', [
        input,
        '--rate=1',
        '--video-filter=scene',
        `--start-time=${start}`,
        `--stop-time=${start+duration}`,
        '--scene-format=png',
        '--scene-ratio=1',
        '--scene-prefix=snap',
        `--scene-path=${workDir}${sep}${segment}`,
        '--scene-height=480',
        'vlc://quit'
      ])
      
      proc.on('close', resolve)
  })
}

module.exports = makeImages
