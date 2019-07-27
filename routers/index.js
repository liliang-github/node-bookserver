const router = new (require('koa-router'))()
const controllers = require('../controllers')
router.post('/register', controllers.register)
router.post('/login', controllers.login)
router.post('/addbook', controllers.addbook)
router.get('/booklist', controllers.booklist)
router.get('/book', controllers.book)
router.post('/comment', controllers.addcomment)
router.get('/comment', controllers.commentlist)
router.post('/check', controllers.check)
router.get('/hotbook', controllers.hotbook)

module.exports = router