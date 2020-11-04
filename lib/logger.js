const colors = require('colors/safe');
const { settings } = require('../config');

colors.setTheme(settings.theme);

const error = (label, data) => {
  console.log(colors.error(label));
  if (data) {
    console.log(colors.error(data));
  }
};

const data = (payload) => {
  console.log(colors.data(payload));
}

const info = (message) => {
  console.log(colors.info(message));
};

const help = (message) => {
  console.log(colors.help(message));
};

module.exports = {
  data,
  error,
  info,
  help
};
