var express = require("express");
var router = express.Router();
const axios = require("axios");
var express = require("express");
var router = express.Router();
var mysql = require("mysql");
const { Octokit } = require("@octokit/core");

async function makeCommittoRepo(token, inputLine, student) {
  try {
    console.log("시발?");
    const user = new Octokit({
      auth: token,
    });
    try {
      const response = await user.request(
        "GET /repos/{owner}/{repo}/contents/{path}",
        {
          owner: "CNUCSE-RESUME",
          repo: `${student}Resume`,
          path: "README.md",
        }
      );

      const beforeSHA = response.data.sha;
      const before = Buffer.from(response.data.content, "base64").toString(
        "utf8"
      );
      const content = Buffer.from(before.concat(inputLine), "utf8").toString(
        "base64"
      );
      console.log(`response ${response}`);
      try {
        await user.request("PUT /repos/{owner}/{repo}/contents/{path}", {
          owner: "CNUCSE-RESUME",
          repo: `${student}Resume`,
          path: "README.md",
          content: content,
          message: "changed your repo",
          sha: beforeSHA,
        });
        console.log("made commit");
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
}

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

  const id = `${sendReq.title}${sendReq.student}`;
  const content = `- [${sendReq.date}] [${sendReq.title}] - ${sendReq.description}`;
  // console.log(content);
  // console.log(id);
  // var sql =
  //   "INSERT INTO commitlog(username, id, content, stu_username) VALUES(?,?,?,?) ON DUPLICATE KEY UPDATE content = (?)";
  // var param = [sendReq.admin, id, content, sendReq.student, content];

  // con.query(sql, param, function (err, rows, fields) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log(`"${content}" => has been added`);
  //   }
  // });
  var sql = "SELECT token FROM user WHERE username=?";
  var param = [sendReq.prof];
  con.query(sql, param, function (err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      makeCommittoRepo(rows[0].token, content, sendReq.student);
    }
  });

  con.end();
  res.end();
});

module.exports = router;
