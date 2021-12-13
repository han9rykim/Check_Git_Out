var express = require("express");
var router = express.Router();
var express = require("express");
var router = express.Router();
const getConnection = require("../db/database");
const { Octokit } = require("@octokit/core");
//GitHub Octokit 라이브러리 참고. https://octokit.github.io/rest.js/v18/
async function makePRfromAtoB(token, stuname) {
  const octokit = new Octokit({
    auth: token,
  });
  // B의 레포를 fork한 후 A가 수정하여 PR을 날리는 경우
  try {
    await octokit.request("POST /repos/{owner}/{repo}/pulls", {
      owner: `${stuname}`, // 풀리퀘 받을 학생 이름 -> B
      title: "PR for your Resume", // 풀리퀘 제목
      repo: `${stuname}Resume`, // 풀리퀘 날릴 레포 이름
      body: "PR for your Resume", // 풀리퀘 관련 내용
      head: "CNUCSE-RESUME:main", //A의 이름:branch 이름
      base: "main", //B의 branch 이름
    });
  } catch (err) {
    console.log(err);
  }
}

router.post("/", async (req, res) => {
  const sendReq = req.body;
  console.log("PR router");
  console.log(sendReq);
  try {
    var token = "";
    var sql = "SELECT token FROM user WHERE username=?";
    var params = [sendReq.prof];
    try {
      await getConnection((con) => {
        con.query(sql, params, async function (err, rows, fields) {
          if (err) {
            console.log(err);
          } else {
            await makePRfromAtoB(rows[0].token, sendReq.stuname);
          }
        });
        res.end();
        con.release();
      });
      res.end();
    } catch (err) {
      console.log(err);
    }
    console.log("PR 성공적");
    res.end();
  } catch (err) {
    console.log(err);
  }
  res.end();
});

module.exports = router;
