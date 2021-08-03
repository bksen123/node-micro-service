var express = require('express');
var router = express.Router();
const users = require('../controllers/users.controller.js');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource transaction service');
});

router.get('/test', users.test);

module.exports = router;