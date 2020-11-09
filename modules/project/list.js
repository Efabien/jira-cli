const jiraClient = require('../../lib/jira-client');

module.exports = async (arg, utils) => {
  const spinner = utils.spinnerFactory.create('Loading projects ...');
  spinner.start();
  const projects = await jiraClient.getProjects();
  spinner.succeed();
  projects.forEach(project => {
    utils.logger.info(` * Name: ${project.name} | key: ${ project.key} | id: ${project.id}`);
  });
};
