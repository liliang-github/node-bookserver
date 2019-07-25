const mysql = require('mysql')
const pool = mysql.createPool({
  user: 'root',
  password: 'x5',
  host: '127.0.0.1',
  port: 3306,
  database: 'book'
})

module.exports = function (sql, params) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err)
      }
      connection.query(sql, params, (err, result) => {
        try {
          if (err) {
            return reject(err)
          }
          resolve(result)
        } finally {
          connection.release()
        }
      })
    })
  })
}