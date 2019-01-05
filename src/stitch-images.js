const { spawn } = require('child_process')
const { sep} = require('path')

function stitchImages(segment, workDir) {
    return new Promise(resolve => {
        const ffmpeg = spawn('ffmpeg', [
            '-r',
            24,
            '-f',
            'image2',
            '-i',
            `${workDir}${sep}${segment}${sep}snap%05d.png`,
            '-vcodec',
            'libx264',
            '-crf',
            '22',
            '-pix_fmt',
            'yuv420p',
            `${workDir}${sep}clip${segment}.mp4`
        ])
        ffmpeg.on('close', resolve)
        ffmpeg.stderr.on('data', data => console.log(String(data)))
    })    
}

module.exports = stitchImages
