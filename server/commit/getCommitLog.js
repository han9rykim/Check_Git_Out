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
  const student = req.body;
  //   console.log(student.username);
  var sql = "SELECT * FROM commitlog WHERE stu_username=?";
  var params = [student.username];
  var sendContent = "";
  var con;
  try {
    con = await mysql.createConnection({
      host: "localhost",
      user: "root",
      port: 3306,
      password: "",
      database: "gResume",
    });
    try {
      await con.connect(function (err) {
        if (err) throw err;
        console.log("Get CommitLog router Connected");
      });
      try {
        await con.query(sql, params, function (err, rows, fields) {
          //두번째 인자에 배열로 된 값을 넣어줄 수 있다.
          if (err) {
            console.log(err);
          } else {
            //   sendContent = rows;
            //   console.log(sendContent.content);
            //   console.log("#");
            for (var i = 0; i < rows.length; i++) {
              sendContent +=
                rows[i].username +
                "교수님이 작성한 내용 - " +
                rows[i].stu_username +
                "학생의" +
                rows[i].content +
                "\n";
            }

            if (rows.length == 0) {
              res.send("내용이 아직 없습니다.");
            } else {
              res.send(sendContent);
            }
            console.log(`${sendContent}`);
          }
        });
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
  // res.end();
  con.end();
});

module.exports = router;
