// @ts-check

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
  const templateProject = await _.download(url, options.proxy, !options.cache)

  const isTemlateExist = await _.checkDirExist(templateProject)

  if (!isTemlateExist) {
    // eslint-disable-next-line no-console
    console.error('can not download the template project, please check your internet connection.')
    process.exit(1)
  }

  await _.recursiveMkdir(dirPath)

  await copy(templateProject, dirPath)
}


/**
 * create template
 * @param {string} repo
 * @param {string} dirPath
 * @param {Object} options
 */
module.exports = function template(repo, dirPath, options = {}) {
  if (!_.validateRepo(repo)) {
    // eslint-disable-next-line no-console
    console.error('invalid repo:', repo)
    process.exit(1)
  }
  const cwd = dirPath && path.resolve(process.cwd(), dirPath)
  dirPath = dirPath || process.cwd()

  init(dirPath, repo, options)
    .then((v) => {
      // eslint-disable-next-line no-console
      console.log(`[copy template]: ${dirPath}`)
      if (options.install) {
        // eslint-disable-next-line no-console
        console.log('start install dependences...')
        return _.install(cwd)
      } else {
        return v
      }
    })
    // eslint-disable-next-line no-console
    .then(() => console.log('[The installation is complete!]'))
    // eslint-disable-next-line no-console
    .catch(err => console.error(err))
}
