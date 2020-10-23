const request = require('request-promise');
const { HOST, username, TOKEN } = require('../config/user-config');
const getBasicAuth = (username, TOKEN) => {
  return `Basic ${Buffer.from(username + ':' + TOKEN).toString('base64')}`;
};

module.exports = {
  getIssues: () => {
    return request({
      method: 'GET',
      uri: `${HOST}/rest/api/2/search`,
      qs: {
        assignee: `${username}`
      },
      headers: {
        Authorization: getBasicAuth(username, TOKEN)
      },
      json: true
    });
  }
};
