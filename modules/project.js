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
  },
  view: async (arg) => {
    console.log(arg)
    const spinner = spinnerFactory.create('Opening ...');
    spinner.start();
    const project = await jiraClient.getProject(arg.key);
    spinner.succeed();
    console.log(project)
  }
}

module.exports = (arg) => {
  return operations[arg.subCmd](arg);
};