var express = require("express");
var router = express.Router();
const axios = require("axios");
var express = require("express");
var router = express.Router();
const getConnection = require("../db/database");

router.post("/", async (req, res) => {
  const response = req.body;
  console.log(response);
  var sql =
    "DELETE FROM commitlog WHERE stu_username=? and username=? and content=?";
  var params = [
    response.header.stuname,
    response.header.prof,
    response.header.content,
  ];

  getConnection((con) => {
    con.query(sql, params, function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        console.log(`Deleted Only Yours`);
      }
    });
    con.release();
  });

  res.end();
});

module.exports = router;
