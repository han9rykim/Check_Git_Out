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
  console.log(sendReq);
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

  con.end();
  res.end();
});

module.exports = router;
