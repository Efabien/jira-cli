const jiraClient = require('../lib/jira-client');

module.exports = async (arg) => {
  const response = await jiraClient.getIssues();
  console.log(response)
};
