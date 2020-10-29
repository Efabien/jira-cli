const jiraClient = require('../../lib/jira-client');
const spinnerFactory = require('../../lib/spinner-factory');
const logger = require('../../lib/logger');

module.exports = async (arg) => {
  const spinner = spinnerFactory.create('Loading projects ...');
  spinner.start();
  const projects = await jiraClient.getProjects();
  spinner.succeed();
  projects.forEach(project => {
    logger.info(` * Name: ${project.name} | key: ${ project.key} | id: ${project.id}`);
  });
};
