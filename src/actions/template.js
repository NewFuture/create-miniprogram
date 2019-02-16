// @ts-check

'using strict'

const path = require('path')

const _ = require('../utils')

/**
 * 拷贝所有文件
 */
async function copy(templateProject, dirPath) {
  const globOptions = {
    cwd: templateProject,
    nodir: true,
    dot: true
  }

  const allFiles = await _.globSync('**/*', globOptions)

  for (let i = 0, len = allFiles.length; i < len; i++) {
    const filePath = allFiles[i]
    // eslint-disable-next-line no-await-in-loop
    await _.copyFile(path.join(templateProject, filePath), path.join(dirPath, filePath))
  }
}

/**
 * 执行初始化命令
 */
async function init(dirPath, url, options) {
  // 拉取模板
  const templateProject = await _.downloadTemplate(url, options.proxy, options.newest)

  const isTemlateExist = await _.checkDirExist(templateProject)

  if (!isTemlateExist) {
    // eslint-disable-next-line no-console
    console.error('can not download the template project, please check your internet connection.')
    process.exit(1)
  }

  await _.recursiveMkdir(dirPath)

  await copy(templateProject, dirPath)
}

module.exports = function (dirPath, options = {}) {
  dirPath = dirPath || process.cwd()
  init(dirPath, options.repo, options)
    // eslint-disable-next-line no-console
    .then(() => console.log(`[init done]: ${dirPath}`))
    // eslint-disable-next-line no-console
    .catch(err => console.error(err))
}
