const open = require('open');
const git = require('../../lib/git');
const logger = require('../../lib/logger');
const { HOST } = require('../../config/user-config');

module.exports = async(arg) => {
  try {
    if (arg.issue) return open(`${HOST}/browse/${arg.issue}`);
    const branchName = await git.getBranchName();
    return open(`${HOST}/browse/${branchName}`);
  } catch (e) {
    logger.error('use the -i flag tp provide the issue key name')
    return logger.error('Git error', e);
  }
};
