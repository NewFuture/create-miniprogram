// @ts-check

const _ = require('../utils')

function cache(options) {
  const templateDir = _.getTemplateDir()

  if (options.clear) {
    _.removeDir(templateDir)
      // eslint-disable-next-line no-console
      .then(() => console.log(`[remove cache done]: ${templateDir}`))
      // eslint-disable-next-line no-console
      .catch(err => console.error(err))
  } else {
    // eslint-disable-next-line no-console
    console.log(templateDir)
  }
}

module.exports = cache
