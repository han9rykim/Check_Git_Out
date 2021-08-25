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
}

router.post("/", async (req, res) => {
  const response = req.body;
  //   console.log(response);

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

    var sql = "SELECT * FROM commitlog WHERE stu_username=?";
    var params = [response.headers.stuname];
    var prof = [];
    var content = [];

    await con.query(sql, params, function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        // const token = "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";
        // makeCommittoRepo(token, rows[0].content, rows[0].stu_username);
        // for (var i = 0; i < rows.length; i++) {
        //   prof.
        // }
        // for (var i = 0; i < rows.length; i++) {
        //   const username = rows[i].username;
        //   var sql = "SELECT token FROM user WHERE username=?";
        //   var params = [username];
        //   var token = "";
        //   console.log(`이전 토큰${token}`);
        //   con.query(sql, params, function (err, rows, fields) {
        //     if (err) {
        //       console.log(err);
        //     } else {
        //       token = rows[0].token;
        //     }
        //   });
        //   makeCommittoRepo(token, rows[i].content, rows[i].stu_username);
        //   console.log(`이후 토큰${token}`);
        // }
      }
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
