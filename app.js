#!/usr/bin/env node
const CliIfy = require('cli-ify');

const cliIfy = new CliIfy();
cliIfy.init({ manifest: './cli-ify.yml' });
