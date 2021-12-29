var express = require("express");
var router = express.Router();
const getConnection = require("../db/database");

router.post("/", async (req, res) => {
  const student = req.body;
  // 요청 받은 req.body를 student이름으로 지정.
  //   console.log(student.username);
  var sql = "SELECT * FROM commitlog WHERE stu_username=?";
  // 구직자에게 입력된 모든 이력을 갖고온다.
  var params = [student.username];
  // sql param 설정.
  var sendContent = "";
  // 작성된 이력을 저장할 문자열 변수.
  let tmpList = [];
  // 배열에 넣어서 전송한다.
  try {
    await getConnection((con) => {
      con.query(sql, params, function (err, rows, fields) {
        if (err) {
          console.log(err);
        } else {
          if (rows.length == 0) {
            try {
            } catch (err) {
              res.send("내용이 아직 없습니다.");
            }
            // 전송한 내용이 없으면 rows.length는 0이다
          } else {
            for (let i = 0; i < rows.length; i++) {
              tmpList.push({
                writer: `${rows[i].username}`,
                student: `${rows[i].stu_username}`,
                content: `${rows[i].content}`,
                // row: `${rows[i]}`,
              });
              // tmpList에 객체형태로 저장한다.
              sendContent += `writer: ${rows[i].username},
                student: ${rows[i].stu_username},
                content: ${rows[i].content}`;
            }
            console.log(tmpList);
            res.status(200).json({ status: "success", data: tmpList });
            // json형태로 tmpList배열을 전송한다.
            res.end();
          }
        }
      });
      con.release();
      // connection을 반환한다.
    });
  } catch (err) {
    console.log(err);
  }
  return;
});

module.exports = router;
