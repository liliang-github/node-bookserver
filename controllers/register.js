const query = require('../utils/db')
module.exports = async ctx => {
  let { username, password, nickname } = ctx.request.body
  if (!(username && password && nickname)) {
    return ctx.state = {
      code: -1,
      data: 'invalid params'
    }
  }
  try {
    await query(`insert into user(username,password,nickname) values(?,?,?)`, [username, password, nickname])
    ctx.state = {
      data: '注册成功'
    }
  } catch (e) {

  }
}