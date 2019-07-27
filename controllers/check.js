const redis = require('../utils/redis')
module.exports = async ctx => {
  try {
    let { token } = ctx.request.body
    const user = await redis.get(token) || {}
    if (token && user.token && user.token === token) {
      ctx.state = {
        data: 'success'
      }
    } else {
      throw '用户会话已过期'
    }
  } catch (e) {
    ctx.state = {
      code: -1,
      data: e
    }
  }
}