const jiraClient = require('../lib/jira-client');
const spinnerFactory = require('../lib/spinner-factory');

module.exports = async (arg) => {
  const spinner = spinnerFactory.create('Loading issues ...');
  spinner.start();
  const response = await jiraClient.getProjects();
  spinner.succeed();
  console.log(response)
};
