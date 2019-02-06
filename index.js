#!/usr/bin/env node

const express = require('express');
const fs = require('fs');
const minimist = require('minimist');
const path = require('path');

var argv = minimist(process.argv.slice(2));

const app = express();

const port = argv.p || 3000;
const indexFile = argv.i || 'index.html';
const appDir = argv._[0];

if (argv.h) {
    showHelp();
    process.exit();
}

if (appDir) {
    app.use(express.static(appDir));
    app.get('/*', (req, res) => res.send(fs.readFileSync(path.join(appDir, indexFile)).toString()));

    app.listen(port, () => console.log(`listening on: http://localhost:${port}`));
} else {
    console.log('ERROR: pass directory');
    showHelp();
}

function showHelp() {
    console.log('Usage:');
    console.log('   $ spa-server [OPTIONS] directory');
    console.log('       -p port');
    console.log('       -i index file name, index.html by default');
    console.log('       -h help');
}
