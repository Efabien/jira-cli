const open = require('open');
const git = require('../../lib/git');
const { HOST } = require('../../config/user-config');

module.exports = async(arg, utils) => {
  try {
    if (arg.issue) return open(`${HOST}/browse/${arg.issue}`);
    const branchName = await git.getBranchName();
    return open(`${HOST}/browse/${branchName}`);
  } catch (e) {
    utils.logger.error('use the -i flag tp provide the issue key name');
    return utils.logger.error('Git error', e);
  }
};
