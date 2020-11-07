#!/usr/bin/env node
const {
  commands,
  options,
  settings
} = require('./config');
const yargs = require('yargs');

const {
  registerCommands, 
  registerOptions
} = require('./lib/init-yargs');

const run = (commands, options, settings) => {
  const inited = registerCommands(commands, yargs, settings);
  registerOptions(options, inited, settings);
  inited.argv;
};

run(commands, options, settings);
