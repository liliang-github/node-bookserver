const query = require('../utils/db')
const redis = require('../utils/redis')
module.exports = async ctx => {
  let { username, password } = ctx.request.body
  try {
    const [user] = await query('select username,password from user where username=? and password=?', [username, password])
    if (user) {
      delete user.password
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