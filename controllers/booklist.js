const query = require('../utils/db')

module.exports = async ctx => {
  let { page = 1, userid, size = 5 } = ctx.request.query
  try {
    let sql = ''
    size = size - 0
    page = (page - 1) * size
    let result = {}
    if (userid) {
      sql = `select a.*,b.nickname from book a join user b on a.userid = b.id where a.userid = ? order by id desc limit ?,?`
      result = await query(sql, [userid, page, size])
    } else {
      sql = `select a.*,b.nickname from book a join user b on a.userid = b.id order by id desc limit ?,?`
      result = await query(sql, [page, size])
    }
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