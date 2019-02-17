// @ts-check

/**
 * Normalize a repo string.
 *
 * @param {String} repo
 * @return {Object}
 */
function normalize(repo) {
  // console.log(repo)
  let regex = /^(?:(direct):([^#]+)(?:#(.+))?)$/
  let match = regex.exec(repo)
  let type = ''
  let origin = ''
  if (match) {
    return {
      type: 'direct',
      url: match[2],
      checkout: match[3] || 'master'
    }
  } else if (repo.startsWith('http')) {
    regex = /^https?:\/\/(([\w-]+)\.[\w.-]*)\/([\w-]+)\/([\w.-]+)(?:\/(?:tree|blob|branch)\/([\w.-]+))?\/?/
    match = regex.exec(repo)
    origin = match[1]
    type = match[2]
  } else {
    regex = /^(?:(github|gitlab|bitbucket):)?(?:(.+):)?([^/]+)\/([^#]+)(?:#(.+))?$/
    match = regex.exec(repo)
    type = match[1] || 'github'
    origin = match[2] || (type + '.com')
  }
  const owner = match[3]
  const name = match[4]
  const checkout = match[5] || 'master'
  return {
    type,
    origin,
    owner,
    name,
    checkout
  }
}

/**
 * Adds protocol to url in none specified
 *
 * @param {String} origin
 * @param {boolean} [clone]
 * @return {String}
 */

function addProtocol(origin, clone) {
  if (!/^(f|ht)tps?:\/\//i.test(origin)) {
    if (clone) { origin = 'git@' + origin } else { origin = 'https://' + origin }
  }

  return origin
}

/**
 * Return a zip or git url for a given `repo`.
 *
 * @param {Object} repo
 * @param {boolean} [clone]
 */

function getUrl(repo, clone) {
  let url

  // Get origin with protocol and add trailing slash or colon (for ssh)
  let origin = addProtocol(repo.origin, clone)
  origin += /^git@/i.test(origin) ? ':' : '/'

  // Build url
  if (clone) {
    url = origin + repo.owner + '/' + repo.name + '.git'
  } else {
    switch (repo.type) {
      case 'github':
        url = origin + repo.owner + '/' + repo.name + '/archive/' + repo.checkout + '.zip'
        break
      case 'gitlab':
        url = origin + repo.owner + '/' + repo.name + '/repository/archive.zip?ref=' + repo.checkout
        break
      case 'bitbucket':
        url = origin + repo.owner + '/' + repo.name + '/get/' + repo.checkout + '.zip'
        break
      default:
        break
    }
  }
  return url
}

module.exports = {
  normalize,
  getUrl
}
