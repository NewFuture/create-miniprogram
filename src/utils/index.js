// @ts-check


module.exports = require('./dir')
module.exports.download = require('./download')
module.exports.validateRepo = require('./repo').validate
module.exports.isYarn = require('./env').isYarn
module.exports.install = require('./env').install
