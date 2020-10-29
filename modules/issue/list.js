const jiraClient = require('../../lib/jira-client');
const spinnerFactory = require('../../lib/spinner-factory');
const logger = require('../../lib/logger');

module.exports = async (arg) => {
  if (!arg.project) return logger.error('use the -p flag to provide the project key name');
  const spinner = spinnerFactory.create(`Loading issues on project ${arg.project} ...`);
  spinner.start();
  const project = await jiraClient.getProjectFromKey(arg.project);
  const data = await jiraClient.getIssues(project.id);
  spinner.succeed();
  data.issues.forEach(issue => {
    logger.info(`* key: ${issue.key} | ${issue.fields.summary}`);
  });
};
