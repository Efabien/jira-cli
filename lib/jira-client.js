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

const get = (path, qs = {}) => {
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
  getIssues: (projectId) => {
    return get(
      '/search',
      {
        jql: `project=${projectId} AND assignee=${emailAddress.replace('@', '\\u0040')}`
      }
    );
  },
  getProjects: () => {
    return get('/project');
  },
  getProject: (key) => {
    return get(`/project/${key}`);
  },
  getProjectFromKey: async(key) => {
    const projects = await get('/project');
    return projects.find(project => project.key === key);
  }
};
