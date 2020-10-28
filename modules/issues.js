const open = require('open');
const { exec } = require('child_process');
const jiraClient = require('../lib/jira-client');
const spinnerFactory = require('../lib/spinner-factory');
const logger = require('../lib/logger');
const { HOST } = require('../config/user-config');

const operations = {
  view: (arg) => {
    if (!arg.issue) return logger.error('use the -i flag tp provide the issue key name');
    return open(`${HOST}/browse/${arg.issue}`);
  },
  open: (arg) => {
    exec('git rev-parse --abbrev-ref HEAD', (err, stdout, stderr) => {
        if (err) return logger.error('git error', err);
        if (typeof stdout === 'string') {
          const gitBranch = stdout.trim();
          return open(`${HOST}/browse/${gitBranch}`);
        }
        return logger.error('Could not retrieve git branch name');
    });
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

module.exports = async (arg) => {
  const func = operations[arg.subCmd];
  if (!func) return logger.error(`Invalide sub-commande ${arg.subCmd}`);
  return func(arg);
};
