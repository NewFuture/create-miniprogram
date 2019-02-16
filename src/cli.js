#!/usr/bin/env node

// @ts-check

'using strict'

const path = require('path')
const fs = require('fs')

const program = require('commander')
const inquirer = require('inquirer')

const init = require('./actions/init')
const template = require('./actions/template')
const upgrade = require('./actions/upgrade')
const cache = require('./actions/cache')

const config = require('./config')
// @ts-ignore
const packageConfig = require('../package.json')

/**
 * 全局参数
 */
program
  .version(packageConfig.version)
  .allowUnknownOption(false)
  .option('-f, --force', 'all files will be overrided except src folder and test case files')
  .option('-p, --proxy <url>', 'http/https request proxy')

/**
 * 初始化相关
 */
program
  .command('init [dirPath]')
  .description('create a project with template project')
  .option(
    '-t, --type <type>',
    'template project type, only accept "custom-component", "miniprogram", "plugin", "game"',
    'miniprogram'
  )
  .option('-n, --newest', 'use newest template to initialize project')
  .action((dirPath, options) => {
    dirPath = dirPath || process.cwd()

    const choices = ['custom-component', 'miniprogram', 'plugin', 'game']

    if (options.type === 'node' || options.type === 'php') {
      // eslint-disable-next-line no-console
      console.log(`template project [ ${options.type} ] has been deprecated`)
    }

    if (!options.type || choices.indexOf(options.type) < 0) {
      // 未指定类型，则发起询问
      inquirer
        .prompt([
          {
            type: 'list',
            name: 'type',
            message: 'which type of project want to use to initialize',
            default: 'custom-component',
            choices
          }
        ])
        .then(answers => init(dirPath, Object.assign(options, answers)))
        // eslint-disable-next-line no-console
        .catch(err => console.error(err))
    } else {
      // 已指定类型
      init(dirPath, options)
    }
  })

/**
 * git模板
 */
program
  .command('template [dirPath]')
  .description('create a project with template project')
  .option('-r, --repo <repo>', 'template git repo', config.typescript.download)
  .option('-n, --newest', 'use newest template to initialize project')
  .action((dirPath, options) => template(dirPath, options))

/**
 * 升级相关
 */
program
  .command('upgrade [dirPath]')
  .description('upgrade the miniprogram custom component framwork')
  .action((dirPath, options) => {
    dirPath = dirPath || process.cwd()
    try {
      fs.accessSync(path.join(dirPath, './project.config.json'))

      inquirer
        .prompt([
          {
            type: 'confirm',
            name: 'force',
            message:
              "this project doesn't look like a custom component project, is it stop upgrading?",
            default: true
          }
        ])
        .then(answers => {
          if (!answers.force) {
            // 猜测为非自定义组件项目，仍旧强制升级
            upgrade(dirPath, options)
          }
          return answers
        })
        // eslint-disable-next-line no-console
        .catch(err => console.error(err))
    } catch (err) {
      // ignore
      upgrade(dirPath, options)
    }
  })

/**
 * 缓存相关
 */
program
  .command('cache')
  .description('show the path of template projects cache')
  .option('-c, --clear', 'clear cache')
  .action(cache)

program.parse(process.argv)

if (!program.args.length) {
  // show help with empty command
  program.help()
}
