const redis = require('../utils/redis')
const query = require('../utils/db')
const axios = require('axios')
const api = 'https://api.douban.com/v2/book/isbn/${code}?apikey=0df993c66c0c636e29ecbb5344252a4a'
module.exports = async ctx => {
  let { code, token } = ctx.request.body
  try {
    const user = await redis.get(token) || {}
    if (!user.id)
      throw '用户未登录'
    if (!code) {
      throw '无效编码'
    }
    let [{ count }] = await query('select count(1) as count from book where isbn10=? or isbn13=?', [code, code])
    if (count) {
      throw '图书已存在'
    }

    const { data } = await axios.get(api.replace('${code}', code))
    let sql = `insert into 
              book(userId,rating,author,subtitle,pubdate,tags,image,alt,publisher,isbn10,isbn13,title,price,hot,author_intro,summary)
              values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`

    const params = {
      userId: user.id,
      rating: data.rating.average,
      author: data.author.join(','),
      subtitle: data.subtitle,
      pubdate: data.pubdate,
      tags: data.tags.map((el) => {
        return `${el.name} ${el.count}`
      }).join(','),
      image: data.image,
      alt: data.alt,
      publisher: data.publisher,
      isbn10: data.isbn10,
      isbn13: data.isbn13,
      title: data.title,
      price: data.price,
      hot: 0,
      author_intro: data.author_intro,
      summary: data.summary
    }

    const res = await query(sql, Object.values(params))
    console.log(res)

    ctx.state = {
      data: {
        ...params
      }
    }
  } catch (e) {
    ctx.state = {
      code: -1,
      data: e
    }
  }
}