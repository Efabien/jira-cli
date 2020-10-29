const _ = require('lodash');
const {
  errorHandler,
  progressHandler,
  promptHandler,
  commandHandler,
  helpHandler
} = require('./decorators');

const registerCommands = (commands, yargs, settings) => {
  commands.reduce((yargs, command) => {
    const cmd =  Object.keys(command)[0];
    const argv = command[cmd].argv ?
      ` [${command[cmd].argv}]` :
      '';
    const operations = command[cmd]['sub-commands'].reduce((holder, sbc) => {
      const subCmd = Object.keys(sbc)[0];
      holder[subCmd] = helpHandler(
        require(`../modules/${command[cmd].module}/${subCmd}`),
        sbc[subCmd].describe
      );
      return holder;
    }, {});
    let func = errorHandler(commandHandler((arg) => {}, operations));
    return yargs
      .command(`${cmd}${argv}`, command[cmd].describe, (yargs) => {}, func);
  }, yargs);
};

const registerOptions = (options, yargs, settings) => {
  options.forEach(option => {
    for (let key in option) {
      yargs.option(key, _.pick(option[key], ['alias', 'type', 'description']))
    }
  });
};

module.exports = {
  registerCommands,
  registerOptions
};
