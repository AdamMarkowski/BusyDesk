const dbConn = require('../lib/db');

module.exports = {
  list: (callback) => {
    const sql = 'SELECT * FROM spaces';

    dbConn.query(sql, callback)
  },

  create: (name, callback) => {
    dbConn.query(
      `INSERT INTO spaces
        (name)
        VALUES
        (?)`,
      [name],
      callback)
  },

  destroy: (id, callback) => {
    dbConn.query('DELETE FROM spaces WHERE id = ?', [id], callback)
  }
}
