// @ts-check

'using strict'

const path = require('path')
const fs = require('fs')

const inquirer = require('inquirer')

const initCustomComponent = require('../custom-component/init')
const initQuickstart = require('../quickstart/init')

/**
 * 开始初始化自定义组件
 */
function startInitCustomComponent(dirPath, options) {
  const defualtName = path.basename(dirPath)

  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'please input the package name',
        default: defualtName
      },
      {
        type: 'input',
        name: 'version',
        message: 'please input the package version',
        default: '1.0.0',
        validate(input) {
          return input.match(/^\d+\.\d+\.\d+$/)
            ? true
            : 'the version must be in <number>.<number>.<number> format'
        }
      },
      {
        type: 'input',
        name: 'dist',
        message: 'please input the miniprogram dist folder',
        default: 'miniprogram_dist'
      },
      {
        type: 'input',
        name: 'git',
        message: 'please input the git repository url'
      },
      {
        type: 'input',
        name: 'author',
        message: 'please input the author'
      }
    ])
    .then(answers => initCustomComponent(dirPath, Object.assign(options, answers)))
    // eslint-disable-next-line no-console
    .catch(err => console.error(err))
}
/**
 * 开始初始化
 */
function startInit(dirPath, options) {
  if (options.type === 'custom-component') {
    // 自定义组件
    if (options.force) {
      startInitCustomComponent(dirPath, options)
    } else {
      try {
        fs.accessSync(path.join(dirPath, './package.json'))
        // eslint-disable-next-line no-console
        console.log(`project already exists: ${dirPath}`)
      } catch (err) {
        startInitCustomComponent(dirPath, options)
      }
    }
  } else if (options.force) {
    // 其他 quickstart

    initQuickstart(dirPath, options)
  } else {
    try {
      fs.accessSync(path.join(dirPath, './project.config.json'))
      // eslint-disable-next-line no-console
      console.log(`project already exists: ${dirPath}`)
    } catch (err) {
      initQuickstart(dirPath, options)
    }
  }
}

module.exports = startInit
