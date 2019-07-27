const query = require('../utils/db')
const redis = require('../utils/redis')
module.exports = async ctx => {
  try {
    let { token, comment, bookid, userid, phone, location } = ctx.request.body
    let user = await redis.get(token) || {}
    if (user.id != userid) {
      throw '无效的用户'
    }
    const sql = 'insert into comment(bookid,userid,comment,location,phone) values(?,?,?,?,?)'
    const result = await query(sql, [bookid, userid, comment, location, phone])
    ctx.state = {
      data: '评论成功'
    }
  } catch (e) {
    ctx.state = {
      code: -1,
      data: e
    }
  }
}