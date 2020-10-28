const { exec } = require('child_process');

module.exports = {
  getBranchName: () => {
    return new Promise((resolve, reject) => {
      exec('git rev-parse --abbrev-ref HEAD', (err, stdout, stderr) => {
        if (err) return reject(err);
        resolve(stdout.trim());
      });
    });
  }
};
