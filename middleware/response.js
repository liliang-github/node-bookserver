module.exports = async (ctx, next) => {
  try {
    await next()
    if (!ctx.body) {
      ctx.body = {
        code: ctx.state.code || 0,
        data: ctx.state.data || ''
      }
    }

  } catch (e) {
    ctx.status = 200
    ctx.body = {
      code: -1,
      error: e.message || e.toString()
    }
  }

}