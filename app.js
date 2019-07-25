const koa = require('koa')
const app = new koa()

const bodyparser = require('koa-bodyparser')
app.use(bodyparser())

const response = require('./middleware/response')
app.use(response)

const router = require('./routers')
app.use(router.routes())

app.listen(3000)