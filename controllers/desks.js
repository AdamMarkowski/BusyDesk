const express = require('express');
const router = express.Router();

const Desks = require('../models/Desks')

router.get('/', function (req, res, next) {
  Desks.list((err, data) => {
    res.json(data);
  });
});

router.post('/create/', function (req, res, next) {
  const name = req.body.name;
  const spaceId = req.body.spaceId;

  Desks.create(name, spaceId, (err, result) => {
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
