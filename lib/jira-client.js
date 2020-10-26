const request = require('request-promise');
const _ = require('lodash');
const { HOST, emailAddress, TOKEN } = require('../config/user-config');

const getBasicAuth = (emailAddress, TOKEN) => {
  return `Basic ${Buffer.from(emailAddress + ':' + TOKEN).toString('base64')}`;
};

const authenticate = (option, { emailAddress, TOKEN }) => {
  return _.merge(
    option,
    {
      headers: { Authorization: getBasicAuth(emailAddress, TOKEN) }
    }
  );
};

const get = (path, { emailAddress, TOKEN }, qs = {}) => {
  return request(authenticate(
    {
      method: 'GET',
      uri: `${HOST}/rest/api/2${path}`,
      qs,
      json: true
    },
    { emailAddress, TOKEN }
  ));
};

module.exports = {
  getIssues: () => {
    return get(
      '/search',
      { emailAddress, TOKEN },
      {
        assignee: `${emailAddress}`,
        sortBy: 'duedate'
      }
    );
  },
  getProjects: () => {
    return get(
      '/project',
      { emailAddress, TOKEN }
    );
  },
  getProject: (key) => {
    return get(
      `/project/${key}`,
      { emailAddress, TOKEN }
    );
  }
};
