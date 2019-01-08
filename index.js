'use strict'

const probe = require('./src/probe')
const makeImages = require('./src/make-images')
const stitchImages = require('./src/stitch-images')
const makeDir = require('./src/make-dir')
const mergeClips = require('./src/merge-clips')
const cleanup = require('./src/cleanup')
const { sep } = require('path')

async function makePreview(input, hash) {
    const segments = 8
    const delay = 20
    const length = await probe(input)
    const segmentLength = length / segments - delay;
    const duration = 2
    const range = []
    const snapDir = 'snapshots'
    const workDir = `${__dirname}${sep}${snapDir}${sep}${hash}`
    const destDir = 'clips'

    if (length < delay) {
        return
    }

    await makeDir(workDir)

    for (let i = 0; i < segments; i += 1) {
        range.push(i)
    }
    const jobs = range.map(i => {
        return new Promise(async (resolve) => {
            await makeDir(`${workDir}${sep}${i}`)
            await makeImages({
                input,
                segment: i,
                start: delay + (segmentLength * i) - duration,
                duration,
                workDir
            })
            await stitchImages(i, workDir)
            resolve()
        })
    })

    return Promise.all(jobs).then(async () => {
        console.log('All jobs done')
        await mergeClips(range.map(i => `${workDir}${sep}clip${i}.mp4`), workDir, destDir, hash)
        cleanup(workDir)
    })
}

module.exports = makePreview
