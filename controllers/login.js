const query = require('../utils/db')
const redis = require('../utils/redis')
const uuid = require('uuid')
module.exports = async ctx => {
  let { username, password } = ctx.request.body
  try {
    const [user] = await query('select id,username,password,nickname,avatar from user where username=? and password=?', [username, password])
    if (user) {
      let token = uuid().split('-').join('')
      user.token = token
      delete user.password
      redis.set(token, user, 60 * 60)
      ctx.state = {
        data: user
      }
    } else {
      ctx.state = {
        code: -1,
        data: '用户名或密码错误'
      }
    }
  } catch (e) {
    throw e
  }
} 