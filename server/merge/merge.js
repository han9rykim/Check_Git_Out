var express = require("express");
var router = express.Router();
var express = require("express");
var router = express.Router();
var mysql = require("mysql");
const { Octokit } = require("@octokit/core");
const getConnection = require("../db/database");

async function MakeMerge(token, stuname) {
  var number = "";
  var title = "";
  const octokit = new Octokit({
    auth: token,
  });
  try {
    const response1 = await octokit.request("GET /repos/{owner}/{repo}/pulls", {
      owner: stuname,
      repo: `${stuname}Resume`,
    });

    if (typeof response1.data[0] == "undefined") {
      return null;
    } else {
      number = response1.data[0].number;
      title = response1.data[0].title;
    }
    try {
      const response = await octokit.request(
        `PUT /repos/{owner}/{repo}/pulls/${number}/merge`,
        {
          owner: stuname,
          repo: `${stuname}Resume`,
          pull_number: `${number}`,
          commit_title: `${title}`,
        }
      );
      console.log("Merged");

      // const response = await octokit.request("GET /repos/{owner}/{repo}/pulls", {
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
}

router.post("/", async (req, res) => {
  const sendReq = req.body;
  console.log("merge connected");
  console.log(sendReq);

  try {
    var token = "";
    var sql = "SELECT token FROM user WHERE username=?";
    var params = [sendReq.stuname];
    try {
      await getConnection((con) => {
        con.query(sql, params, async function (err, rows, fields) {
          if (err) {
            console.log(err);
          } else {
            console.log(sendReq.stuname);
            //   console.log(rows[0].token);
            console.log("토큰 찾기");
            await MakeMerge(rows[0].token, sendReq.stuname);
          }
        });
        con.release();
      });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
  res.end();
});

module.exports = router;
