const express = require('express');
const router = express.Router();
const dbConn = require('../lib/db');

const formatDate = (dateString) => {
  const isoDate = new Date(dateString)
  const mySQLDateString = isoDate.toJSON().slice(0, 19).replace('T', ' ')
  return mySQLDateString
}
router.get('/', function (req, res, next) {
  // const sql = 'SELECT * FROM user ORDER BY id DESC';
  const sql = 'SELECT * FROM reservations';
  dbConn.query(sql, (err, data) => {
    res.json(data);
  });
});

router.post('/create/', function (req, res, next) {
  const userId = req.body.userId;
  const deskId = req.body.deskId;
  const startAt = req.body.startAt;
  const finishAt = req.body.finishAt;

  // insert query
  dbConn.query(
    `INSERT INTO reservations
      (user_id, desk_id, start, end)
      VALUES
      (?, ?, ?, ?)`,
    [userId, deskId, formatDate(startAt), formatDate(finishAt)],
    function (err, result) {

      console.log('req.body: ', req.body)

      if (err) {
        console.log(err)

        res.json({
          status: 'error',
          ...err
        })
      } else {
        res.json({
          status: 'ok'
        })
      }
    })
})

module.exports = router;
