const query = require('../utils/db')
module.exports = async ctx => {
  try {
    let { bookid, userid } = ctx.request.query
    const sql = `select a.*,b.nickname nickname,b.avatar avatar from
                 comment a join user b on a.userid = b.id
                 where a.userid = ? or a.bookid = ? order by a.id desc`
    const result = await query(sql, [userid, bookid])
    ctx.state = {
      data: result
    }
  } catch (e) {
    ctx.state = {
      code: -1,
      data: e
    }
  }
}