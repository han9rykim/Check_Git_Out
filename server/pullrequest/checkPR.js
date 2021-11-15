var express = require("express");
var router = express.Router();
var express = require("express");
var router = express.Router();
var mysql = require("mysql");
const { Octokit } = require("@octokit/core");

async function checkPRList(token, stuname) {
  var number = "";
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
    }
    try {
      const response = await octokit.request(
        `GET /repos/{owner}/{repo}/pulls/${number}/files`,
        {
          owner: stuname,
          repo: `${stuname}Resume`,
        }
      );
      //   console.log(response.data[0].patch);
      const changedContent = response.data[0].patch;
      // const number = response.data[0].number;
      // console.log(`number ${number}`);
      // const url = `https://github.com/binaryKim99/binaryKim99Resume/pull/${number}.diff`;
      // console.log("return url");
      return changedContent;

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
  console.log("checkPR connected");
  console.log(sendReq);

  try {
    const con = await mysql.createConnection({
      host: "localhost",
      user: "root",
      port: 3306,
      password: "",
      database: "gResume",
    });

    var token = "";
    var sql = "SELECT token FROM user WHERE username=?";
    var params = [sendReq.stuname];
    try {
      await con.query(sql, params, async function (err, rows, fields) {
        if (err) {
          console.log(err);
        } else {
          console.log(sendReq.stuname);
          //   console.log(rows[0].token);
          console.log("토큰 찾기");
          const changedContent = await checkPRList(
            rows[0].token,
            sendReq.stuname
          );

          res.send({ changedContent });
        }
      });
    } catch (err) {
      console.log(err);
    }

    con.end();
  } catch (err) {
    console.log(err);
  }
  res.end();
});

module.exports = router;
