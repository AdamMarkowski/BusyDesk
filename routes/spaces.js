const express = require('express');
const router = express.Router();
const dbConn = require('../lib/db');

router.get('/', function (req, res, next) {
  // const sql = 'SELECT * FROM user ORDER BY id DESC';
  const sql = 'SELECT * FROM spaces';
  dbConn.query(sql, (err, data) => {
    res.json(data);
  });
});

// add a new book
router.post('/create/', function (req, res, next) {
  const name = req.body.name;

  // insert query
  dbConn.query(
    `INSERT INTO spaces
      (name)
      VALUES
      (?)`,
    [name],
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
