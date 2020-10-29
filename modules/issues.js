const open = require('open');
const jiraClient = require('../lib/jira-client');
const spinnerFactory = require('../lib/spinner-factory');
const git = require('../lib/git');
const logger = require('../lib/logger');
const { HOST } = require('../config/user-config');

const operations = {
  view: async (arg) => {
    try {
      if (arg.issue) return open(`${HOST}/browse/${arg.issue}`);
      const branchName = await git.getBranchName();
      return open(`${HOST}/browse/${branchName}`);
    } catch (e) {
      logger.error('use the -i flag tp provide the issue key name')
      return logger.error('Git error', e);
    }
  },
  list: async (arg) => {
    if (!arg.project) return logger.error('use the -p flag to provide the project key name');
    const spinner = spinnerFactory.create(`Loading issues on project ${arg.project} ...`);
    spinner.start();
    const project = await jiraClient.getProjectFromKey(arg.project);
    const data = await jiraClient.getIssues(project.id);
    spinner.succeed();
    data.issues.forEach(issue => {
      logger.info(`* key: ${issue.key} | ${issue.fields.summary}`);
    });
  }
};

module.exports = (arg) => {
  const func = operations[arg.subCmd];
  if (!func) return logger.error(`Invalide sub-commande ${arg.subCmd}`);
  return func(arg);
};
