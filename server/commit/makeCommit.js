require("date-utils");
var express = require("express");
var router = express.Router();
const getConnection = require("../db/database");
const { Octokit } = require("@octokit/core");
// Octokit은 Github API를 사용하기 위해 필요하다.

//GitHub Octokit 라이브러리 참고. https://octokit.github.io/rest.js/v18/
async function makeCommittoRepo(token, inputLine, student) {
  //Commit을 수행하는 함수이다.
  console.log("Make Commit 함수 실행");
  const user = new Octokit({
    auth: token,
  });

  // Octokit형 객체를 만든다. 토큰을 멤버필드로 넣어줘야한다.
  try {
    const response = await user.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      {
        owner: "CNUCSE-RESUME",
        repo: `${student}Resume`,
        path: "README.md",
      }
    );

    // Octokit 라이브러리 사용법에 따라 CNUCSE-RESUME organization의 `${student}Resume`, fork해온 구직자의 Resume 레포지토리에서
    // README.md를 불러온다.
    const beforeSHA = response.data.sha;
    //이전 커밋 기록을 알아야한다. GitHub 서버로부터 받은 이전 커밋의 sha를 저장한다.

    const before = Buffer.from(response.data.content, "base64").toString(
      "utf8"
    );
    //이전의 커밋 속의 파일의 코드를 읽어온다. 이는 base64인코딩 방식이라서 utf8로 인코딩이 필요하다.
    const content = Buffer.from(before.concat(inputLine), "utf8").toString(
      "base64"
    );
    //content라는 변수에 이전의 코드와 inputLine을 합쳐서 base64형태로 인코딩한다.

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

      //Octokit 라이브러리를 이용하여 commit을 수행한다.
      var time = newDate.toFormat("YYYY-MM-DD HH24:MI:SS");
      console.log("made commit");
      console.log(time);
      //commit이 수행되고 콘솔창에 시간을 출력합니다.
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
  console.log("MakeCommit.js");
  var prof = [];
  var content = [];

  try {
    // var sql = "SELECT * FROM commitlog WHERE stu_username=?";
    var sql = "SELECT * FROM user WHERE username=?";
    var params = [response.headers.admin];
    //user table에서 추천자의 정보를 읽어온다.
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
          // 생성해 둔 commit을 수행하는 함수를 이용하여 commit을 수행한다.
        }
      });
      con.release();
      res.end();
    });
    res.end();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
