const path = require('path')

process.argv.push('new')
process.argv.push(path.join(__dirname, './demo'))
// process.argv.push('--force') // 强制初始化，就算已存在项目代码
// process.argv.push('--no-cache') // 先拉取最新脚手架再初始化

process.argv.push('--type')
process.argv.push('miniprogram')

require('../../src/cli')
