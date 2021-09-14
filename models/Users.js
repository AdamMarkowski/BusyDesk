const dbConn = require('../lib/db');

module.exports = {
  list: (callback) => {
    const sql = 'SELECT * FROM users';

    dbConn.query(sql, callback)
  },

  create: (lastName, firstName, email, password, callback) => {
    dbConn.query(
      `INSERT INTO users
      (lastName, firstName, email, password)
      VALUES
      (?, ?, ?, ?)`,
      [lastName, firstName, email, password],
      callback)
  },

  find: (email, password, callback) => {
    const sql = 'SELECT * FROM users where email = ? AND password = ?';
    dbConn.query(sql, [email, password], callback)
  },

  destroy: (id, callback) => {
    dbConn.query('DELETE FROM users WHERE id = ?', [id], callback)
  }
}
