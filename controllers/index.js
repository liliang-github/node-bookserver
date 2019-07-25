const fs = require('fs')
const path = require('path')

/**
 * 动态加载当前文件下的所有子js文件
 * @param {*} dir 需加载的根目录
 */
const loadJS = dir => {

  let result = {}

  let { dirs, files } = fs.readdirSync(dir).reduce((a, b) => {
    let isDirectory = fs.statSync(path.join(dir, b)).isDirectory()
    if (isDirectory)
      a.dirs.push(b)
    else
      a.files.push(b)
    return a
  }, { dirs: [], files: [] })

  dirs.forEach(d => {
    loadJS(path.join(dir, d))
  })

  files.forEach(file => {
    if (path.extname(file) == '.js' && !file.includes('index')) {
      result[path.basename(file, '.js')] = require(path.join(dir, file))
    }
  })
  return result
}

module.exports = loadJS(__dirname)