const jiraClient = require('../../lib/jira-client');

module.exports = async (arg, utils) => {
  if (!arg.project) return utils.logger.error('use the -p flag to provide the project key name');
  const spinner = utils.spinnerFactory.create(`Loading issues on project ${arg.project} ...`);
  spinner.start();
  const data = await jiraClient.getIssues(arg);
  spinner.succeed();
  data.issues.forEach((issue, index) => {
    utils.logger.info(`* key: ${issue.key} | ${issue.fields.summary}`);
  });
};
