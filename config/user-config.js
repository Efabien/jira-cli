const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

module.exports = Object.freeze({
  HOST: 'https://noaservices.atlassian.net',
  username: 'fabien@topteam.tech',
  TOKEN: process.env.JIRA_TOKEN
});
