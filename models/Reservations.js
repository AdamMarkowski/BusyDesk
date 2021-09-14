const dbConn = require('../lib/db');

const formatDate = (dateString) => {
  const isoDate = new Date(dateString)
  const mySQLDateString = isoDate.toJSON().slice(0, 19).replace('T', ' ')
  return mySQLDateString
}

module.exports = {
  list: (callback) => {
    const sql = 'SELECT * FROM reservations';

    dbConn.query(sql, callback)
  },

  create: (lastName, firstName, email, password, callback) => {
    dbConn.query(
      `INSERT INTO reservations
      (user_id, desk_id, start, end)
      VALUES
      (?, ?, ?, ?)`,
      [userId, deskId, formatDate(startAt), formatDate(finishAt)],
      callback)
  },

  destroy: (id, callback) => {
    dbConn.query('DELETE FROM reservations WHERE id = ?', [id], callback)
  }
}
