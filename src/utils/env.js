// @ts-check

function isYarn() {
  return process.env.npm_config_user_agent && process.env.npm_config_user_agent.startsWith('yarn')
}

function isWindows() {
  return /^win/.test(process.platform)
}

/**
 * npm /yarn install
 * @param {string} cwd
 */
function install(cwd) {
  return new Promise((resolve, reject) => {
    const suffix = isWindows() ? '.cmd' : '';
    const cmd = (isYarn() ? 'yarn' : 'npm') + suffix
    const ps = require('child_process').spawn(cmd, ['install'], { cwd, stdio: 'inherit' });
    ps.on('close', (code) => {
      if (code !== 0) {
        reject(code)
        console.error(`依赖自动安装出错${code},可手动安装!`);
      } else {
        console.log(`依赖安装完成!`);
        resolve()
      }
    });
  })
}

module.exports = {
  isYarn,
  install
}
