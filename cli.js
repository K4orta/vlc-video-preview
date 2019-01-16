#!/usr/bin/env node

'use strict'

const makePreview = require('./');

makePreview({
    input: process.argv[2], 
    hash: process.argv[3],
    output: process.argv[4]
})