const jiraClient = require('../lib/jira-client');
const spinnerFactory = require('../lib/spinner-factory');
const logger = require('../lib/logger');

const operations = {
  list: async () => {
    const spinner = spinnerFactory.create('Loading projects ...');
    spinner.start();
    const projects = await jiraClient.getProjects();
    spinner.succeed();
    projects.forEach(project => {
      logger.info(` * Name: ${project.name} | key: ${ project.key} | id: ${project.id}`);
    });
  }
}

module.exports = (arg) => {
  const func = operations[arg.subCmd];
  if (!func) return logger.error(`Invalide sub-commande ${arg.subCmd}`);
  return func(arg);
};