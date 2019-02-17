// @ts-check

const download = require('download')
const ProgressBar = require('progress')

const repo = require('./repo')
const dir = require('./dir')

/**
 * 下载模板项目
 * @param {string} repoStr
 * @param {string} proxy
 * @param {boolean} [noCache]
 */
async function downloadTemplate(repoStr, proxy, noCache) {
  const templateProject = dir.getTempPath(repoStr)
  const hasDownload = await dir.checkDirExist(templateProject)
  if (noCache) {
    await dir.removeDir(templateProject)
  }
  if (noCache || !hasDownload) {
    let timer
    // mock download progress
    let total = 20
    const msg = 'downloading template project'
    const bar = new ProgressBar(':bar :token1', {
      total,
      incomplete: '░',
      complete: '█',
      clear: true
    })
    const tick = () => setTimeout(() => {
      total--
      bar.tick({token1: msg})

      if (total !== 1 && !bar.complete) tick()
    }, 500)
    const stop = () => {
      while (!bar.complete) bar.tick({token1: msg})
    }

    try {
      timer = setTimeout(() => {
        // 超过一分钟没下载完，直接退出进程
        if (!bar.complete) {
          stop()
          // eslint-disable-next-line no-console
          console.log('download faild!')
          process.exit(1)
        }
      }, 60 * 1000)

      tick() // 开始
      const repoData = repo.normalize(repoStr)
      const url = repoData.url || repo.getUrl(repoData, false)
      await download(url, templateProject, {
        extract: true,
        strip: 1,
        // mode: '666',
        headers: {accept: 'application/zip'},
        proxy
      })

      stop() // 结束
    } catch (err) {
      stop()
      // eslint-disable-next-line no-console
      console.error(err)
    }

    if (timer) timer = clearTimeout(timer)
  }
  return templateProject
}

module.exports = downloadTemplate
