const dbConn = require('../lib/db');

module.exports = {
  list: (callback) => {
    const sql = 'SELECT * FROM desks';

    dbConn.query(sql, callback)
  },

  create: (name, spaceId, callback) => {
    dbConn.query(
      `INSERT INTO desks
        (name, space_id)
        VALUES
        (?, ?)`,
      [name, spaceId],
      callback)
  },

  destroy: (id, callback) => {
    dbConn.query('DELETE FROM desks WHERE id = ?', [id], callback)
  }
}
