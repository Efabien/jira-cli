const request = require('request-promise');
const { HOST, emailAddress, TOKEN } = require('../config/user-config');
const getBasicAuth = (emailAddress, TOKEN) => {
  return `Basic ${Buffer.from(emailAddress + ':' + TOKEN).toString('base64')}`;
};

module.exports = {
  getIssues: () => {
    return request({
      method: 'GET',
      uri: `${HOST}/rest/api/2/search`,
      qs: {
        assignee: `${emailAddress}`
      },
      headers: {
        Authorization: getBasicAuth(emailAddress, TOKEN)
      },
      json: true
    });
  }
};
