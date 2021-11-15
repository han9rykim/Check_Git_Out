var express = require("express");
var router = express.Router();
const axios = require("axios");
const Octokit = require("octokit");
var express = require("express");
var router = express.Router();
var mysql = require("mysql");

/* post auth. */
// router.get("/", function (req, res, next) {
// 	res.render("index", { title: "AUTH page" });
// });

router.post("/", async (req, res) => {
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    password: "",
    database: "gResume",
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("studentinfo Connected");
  });
  try {
    var sql = "SELECT (username) FROM user";
    var param = [];

    con.query(sql, function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        res.send(rows);
      }
    });
  } catch (err) {
    console.log("error occured");
    console.error(err);
  }
  con.end();
  console.log("studentinfo connect end");
  res.end();
});

module.exports = router;
