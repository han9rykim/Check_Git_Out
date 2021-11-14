require("date-utils");
var express = require("express");
var router = express.Router();
const axios = require("axios");
var express = require("express");
var router = express.Router();
var mysql = require("mysql");
const { Octokit } = require("@octokit/core");

async function makeCommittoRepo(token, inputLine, student) {
  console.log("Make Commit 함수 실행");
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
      var newDate = new Date();
      await user.request("PUT /repos/{owner}/{repo}/contents/{path}", {
        owner: "CNUCSE-RESUME",
        repo: `${student}Resume`,
        path: "README.md",
        content: content,
        message: "changed your repo",
        sha: beforeSHA,
      });
      var time = newDate.toFormat("YYYY-MM-DD HH24:MI:SS");
      console.log("made commit");
      console.log(time);
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
  return 200;
}
async function print() {
  console.log("SIBAL");
}

router.post("/", async (req, res) => {
  const response = req.body;
  console.log(`making commit is in ${response}`);
  // var sql = "SELECT * FROM commitlog WHERE stu_username=?";
  // var params = [response.headers.stuname];
  var prof = [];
  var content = [];

  try {
    const con = await mysql.createConnection({
      host: "localhost",
      user: "root",
      port: 3306,
      password: "",
      database: "gResume",
    });
    await con.connect(function (err) {
      if (err) throw err;
      console.log("Make Commit router Connected");
    });

    try {
      var sql = "SELECT * FROM commitlog WHERE stu_username=?";
      var params = [response.headers.stuname];
      await con.query(sql, params, async function (err, rows, fields) {
        if (err) {
          console.log(err);
        } else {
          console.log(rows.length);
          for (let i = 0; i < rows.length; i++) {
            if (rows[i].username == null) {
              continue;
            }
            prof.push(rows[i].username);
            content.push(rows[i].content);
            // await print();
            await makeCommittoRepo(
              rows[i].token,
              rows[i].content,
              response.headers.stuname
            );
          }
        }
      });
      res.end();
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
  res.end();
});

module.exports = router;
