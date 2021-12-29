var express = require("express");
var router = express.Router();
var express = require("express");
var router = express.Router();
var mysql = require("mysql");
const { Octokit } = require("@octokit/core");
const getConnection = require("../db/database");
//GitHub Octokit 라이브러리 참고. https://octokit.github.io/rest.js/v18/

async function MakeMerge(token, stuname) {
  //생성된 pull request에 대하여 merge를 수행한다.
  var number = "";
  //pull request 번호를 저장할 변수
  var title = "";
  // pull request의 title을 가져올 변수
  const octokit = new Octokit({
    auth: token,
  });
  //Octokit 객체를 생성한다.

  try {
    const response1 = await octokit.request("GET /repos/{owner}/{repo}/pulls", {
      owner: stuname,
      repo: `${stuname}Resume`,
    });
    //pull request를 가져온다.

    if (typeof response1.data[0] == "undefined") {
      return null;
    } else {
      number = response1.data[0].number;
      title = response1.data[0].title;
      //생성된 pull request가 존재할 경우 number와 title을 가져온다.
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
      // 지정된 pull request번호와 title에 맞추어 merge를 진행한다.
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
            console.log("Merge함수 실행");
            // console.log(sendReq.stuname);
            //   console.log(rows[0].token);
            // console.log("토큰 찾기");
            await MakeMerge(rows[0].token, sendReq.stuname);
            //MakeMerge함수를 수행.
          }
        });
        res.end();
        con.release();
      });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
  // res.end();
});

module.exports = router;
