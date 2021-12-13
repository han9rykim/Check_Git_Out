require("date-utils");
var express = require("express");
var router = express.Router();
const axios = require("axios");
var express = require("express");
var router = express.Router();
const getConnection = require("../db/database");
const { Octokit } = require("@octokit/core");

//GitHub Octokit 라이브러리 참고. https://octokit.github.io/rest.js/v18/
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

router.post("/", async (req, res) => {
  const response = req.body;
  // console.log(`making commit is in ${response}`);
  // var sql = "SELECT * FROM commitlog WHERE stu_username=?";
  // var params = [response.headers.stuname];
  console.log("MakeCommit.js");
  var prof = [];
  var content = [];

  try {
    // var sql = "SELECT * FROM commitlog WHERE stu_username=?";
    var sql = "SELECT * FROM user WHERE username=?";
    var params = [response.headers.admin];
    await getConnection((con) => {
      con.query(sql, params, async function (err, rows, fields) {
        if (err) {
          console.log(err);
        } else {
          console.log(rows.length);
          await makeCommittoRepo(
            rows[0].token,
            response.headers.content,
            response.headers.stuname
          );
        }
      });
      con.release();
      res.end();
    });
    // await makeCommittoRepo();

    res.end();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
