const query = require('../utils/db')
module.exports = async ctx => {
  try {
    let { size = 9 } = ctx.request.query
    const sql = 'select * from book order by hot desc limit ?'
    const result = await query(sql, [size])
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