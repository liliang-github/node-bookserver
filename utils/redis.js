const redis = require('redis')
const client = redis.createClient({
  host: '127.0.0.1',
  port: 6379
})


module.exports.get = function (key) {
  return new Promise((resolve, reject) => {
    client.get(key, (err, res) => {
      if (err) {
        return reject(err)
      }
      try {
        const json = JSON.parse(res)
        return resolve(json)
      } catch (e) {
        reject(e)
      }
    })
  })
}

module.exports.set = function (key, value, expire) {
  return new Promise((resolve, reject) => {
    client.set(key, JSON.stringify(value), (err, res) => {
      if (err) {
        return reject(err)
      }
      if (expire) {
        client.expire(key, expire)
      }
      resolve(res)
    })
  })
}