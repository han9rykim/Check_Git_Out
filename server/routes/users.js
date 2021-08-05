var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('여기가 users페이지여');
});

module.exports = router;
