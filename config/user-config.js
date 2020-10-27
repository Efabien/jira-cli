const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

module.exports = Object.freeze({
  HOST: process.env.JIRA_HOST,
  emailAddress: process.env.JIRA_EMAIL_ADDRESS,
  TOKEN: process.env.JIRA_TOKEN
});
