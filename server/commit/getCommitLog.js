var express = require("express");
var router = express.Router();
const axios = require("axios");
const Octokit = require("octokit");
var express = require("express");
var router = express.Router();
var mysql = require("mysql");

router.post("/", async (req, res) => {
  const student = req.body;
  console.log(student.username);
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

  // var sql =
  //   "INSERT INTO commitlog(username, id, content, stu_username) VALUES(?,?,?,?) ON DUPLICATE KEY UPDATE content = (?)";
  // var param = [sendReq.admin, id, content, sendReq.student, content];

  //   var sql = "SELECT * FROM commitlog WHERE stu_username=VALUES ?";
  //   const stu = "binaryKim99";
  //   var param = [stu];

  var sql = "SELECT * FROM commitlog WHERE stu_username=?";
  var params = [student.username];
  con.query(sql, params, function (err, rows, fields) {
    //두번째 인자에 배열로 된 값을 넣어줄 수 있다.
    if (err) {
      console.log(err);
    } else {
      for (var i = 0; i < rows.length; i++) {
        console.log(
          rows[i].username +
            "가 작성한" +
            rows[i].stu_username +
            "의 커밋내용" +
            rows[i].content
        );
      }
    }
  });

  con.end();
  res.end();
});

module.exports = router;
