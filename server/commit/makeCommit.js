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
  const response = req.body;
  var sql = "SELECT * FROM commitlog WHERE stu_username=?";
  var params = [response.headers.stuname];
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
      await con.query(sql, params, function (err, rows, fields) {
        if (err) {
          console.log(err);
        } else {
          for (var i = 0; i < rows.length; i++) {
            if (rows[i].username == null) {
              continue;
            }
            prof.push(rows[i].username);
            content.push(rows[i].content);
          }
          for (var i = 0; i < prof.length; i++) {
            var sql = "SELECT token FROM user WHERE username=?";
            var params = [prof[i]];
            // console.log(prof[i]);
            // console.log(content[i]);
            makeCommittoRepo(
              response.headers.token,
              content[i],
              response.headers.stuname
            );
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
