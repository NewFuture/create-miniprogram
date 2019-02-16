// @ts-check

'using strict'

const path = require('path')
const fs = require('fs')

const inquirer = require('inquirer')

const upgradeCustomComponent = require('../custom-component/upgrade')

/**
 * 开始升级自定义组件
 */
function startUpgradeCustomComponent(dirPath, options) {
  if (options.force) {
    upgradeCustomComponent(dirPath, options)
  } else {
    inquirer
      .prompt([
        {
          type: 'checkbox',
          name: 'override',
          message: 'which files should be overrided',
          pageSize: 10,
          choices: [
            {
              name: 'package.json (only override "scripts", "jest" and "devDependencies")',
              checked: true
            },
            {name: 'tools/config.js', checked: true},
            {name: 'test/utils.js', checked: true},
            {
              name:
                'other tools files (gulpfile.js, tools/build.js, tools/utils.js, tools/checkcomponents.js, tools/test/*.js)',
              checked: true
            },
            {name: 'other config files (.babelrc, .eslintrc)', checked: true},
            {name: 'tools/demo'},
            {name: 'ignore config (.gitignore, .npmignore)'}
          ]
        }
      ])
      .then(answers => upgradeCustomComponent(dirPath, Object.assign(options, answers)))
      // eslint-disable-next-line no-console
      .catch(err => console.error(err))
  }
}

/**
 * 开始升级
 */
function startUpgrade(dirPath, options) {
  try {
    fs.accessSync(path.join(dirPath, './package.json'))
    startUpgradeCustomComponent(dirPath, options)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(`project is not a valid custom component project: ${dirPath}`)
  }
}

module.exports = startUpgrade
