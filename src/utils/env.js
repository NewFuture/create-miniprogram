// @ts-check

function isYarn() {
  return process.env.npm_config_user_agent && process.env.npm_config_user_agent.startsWith('yarn')
}

/**
 * npm /yarn install
 * @param {string} cwd
 */
function install(cwd) {
  return new Promise((resolve, reject) => {
    require('child_process').exec(
      isYarn() ? 'yarn install --no-lockfile' : 'npm install --no-package-lock',
      {cwd},
      (err, stdout, stderr) => {
        // eslint-disable-next-line no-console
        console.error(stderr)
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      }
    )
  })
}

module.exports = {
  isYarn,
  install
}
