// @ts-check

const path = require('path')

const _ = require('../utils')
const config = require('../config').customComponent

const now = new Date()
// const templateDir = _.getTemplateDir()
// const templateProject = path.join(templateDir, config.name)

/**
 * 拷贝 package.json
 */
async function copyPackageJson(templateProject, dirPath, options) {
  let content = await _.readFile(path.join(templateProject, 'package.json'))

  content = content.replace(/("name": ")(?:.*)(")/gi, `$1${options.name}$2`)
  content = content.replace(/("version": ")(?:.*)(")/gi, `$1${options.version}$2`)
  content = content.replace(/("url": ")(?:.*)(")/gi, `$1${options.git}$2`)
  content = content.replace(/("author": ")(?:.*)(")/gi, `$1${options.author}$2`)
  content = content.replace(/("miniprogram": ")(?:.*)(")/gi, `$1${options.dist}$2`)
  content = content.replace(/("main": ")(?:.*)(")/gi, `$1${options.dist}/index.js$2`)

  await _.writeFile(path.join(dirPath, 'package.json'), content)
}

/**
 * 拷贝 license
 */
async function copyLicense(templateProject, dirPath, options) {
  let content = await _.readFile(path.join(templateProject, 'LICENSE'))

  content = content.replace(
    /(Copyright\s+\(c\)\s+)(?:.*)(\s*[\r\n])/gi,
    `$1${now.getFullYear()} ${options.author}$2`
  )

  await _.writeFile(path.join(dirPath, 'LICENSE'), content)
}

/**
 * 拷贝其他文件
 */
async function copyOthers(templateProject, dirPath) {
  const globOptions = {
    cwd: templateProject,
    nodir: true,
    dot: true
  }
  // src 目录
  const srcFiles = await _.globSync('src/**/*', globOptions)

  // test 目录
  const testFiles = await _.globSync('test/**/*', globOptions)

  // tools 目录
  const toolsFiles = await _.globSync('tools/**/*', globOptions)

  // 其他根目录下的文件，如 .gitignore 等
  let rootFiles = await _.globSync('*', globOptions)
  rootFiles = rootFiles.filter(
    toolsFile => toolsFile.slice(-12) !== 'package.json' && toolsFile.slice(-7) !== 'LICENSE'
  )

  const allFiles = [].concat(srcFiles, testFiles, toolsFiles, rootFiles)
  for (let i = 0, len = allFiles.length; i < len; i++) {
    const filePath = allFiles[i]
    // eslint-disable-next-line no-await-in-loop
    await _.copyFile(path.join(templateProject, filePath), path.join(dirPath, filePath))
  }
}

/**
 * 执行初始化命令
 */
async function init(dirPath, options) {
  // 拉取模板
  const templateProject = await _.download(config.download, options.proxy, options.newest)

  const isTemlateExist = await _.checkDirExist(templateProject)

  if (!isTemlateExist) {
    // eslint-disable-next-line no-console
    console.log('can not download the template project, please check your internet connection.')
    process.exit(1)
  }

  await _.recursiveMkdir(dirPath)

  await copyPackageJson(templateProject, dirPath, options)
  await copyLicense(templateProject, dirPath, options)

  await copyOthers(templateProject, dirPath)
}

module.exports = function (dirPath, options = {}) {
  init(dirPath, options)
    // eslint-disable-next-line no-console
    .then(() => console.log(`[init done]: ${dirPath}`))
    // eslint-disable-next-line no-console
    .catch(err => console.error(err))
}
