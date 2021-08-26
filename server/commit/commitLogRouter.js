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
  const { sendReq } = req.body;
  console.log(`${sendReq}`);

  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    password: "",
    database: "gResume",
  });
  con.connect(function (err) {
    if (err) throw err;
    console.log("CommitLog router Connected");
  });

  const id = `${sendReq.title}${sendReq.student}`;
  const content = `[${sendReq.date}] [${sendReq.title}] - ${sendReq.description}`;
  // console.log(content);
  // console.log(id);
  var sql =
    "INSERT INTO commitlog(username, id, content, stu_username, token) VALUES(?,?,?,?,?) ON DUPLICATE KEY UPDATE content = (?)";
  var param = [
    sendReq.admin,
    id,
    content,
    sendReq.student,
    sendReq.token,
    content,
  ];

  con.query(sql, param, function (err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      console.log(`"${content}" => has been added`);
    }
  });

  con.end();
  res.end();
});

module.exports = router;
