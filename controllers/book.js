const query = require('../utils/db')
module.exports = async ctx => {
  try {
    let { id } = ctx.request.query

    await query('update book set hot = hot+1 where id=?', [id])

    const sql = 'select a.*,b.nickname nickname from book a join user b on a.userId = b.id where a.id = ?'

    const [book] = await query(sql, [id])

    ctx.state = {
      data: book
    }

  } catch (e) {
    ctx.state = {
      code: -1,
      data: e
    }
  }
}