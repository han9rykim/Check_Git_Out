var express = require("express");
var router = express.Router();
const getConnection = require("../db/database");
//라우터 초기설정

router.post("/", async (req, res) => {
  try {
    const { sendReq } = req.body;
    const id = `${sendReq.title}${sendReq.student}`; //입력된 이력을 비교하기 위한 식별자이다.
    const content = `<br/>  [${sendReq.date}] [${sendReq.title}] - ${sendReq.description}`;
    // 마크다운에 개행을 넣기 위해 이력 내용을 포맷화한다.
    var sql =
      "INSERT INTO commitlog(username, id, content, stu_username, token) VALUES(?,?,?,?,?) ON DUPLICATE KEY UPDATE content = (?)";
    // sql 명령어이다. ?에 param 배열의 값들이 하나씩 들어간다.
    var param = [
      sendReq.admin,
      id,
      content,
      sendReq.student,
      sendReq.token,
      content,
    ];
    // sql 명령어에 필요한 요소들이다.

    await getConnection((con) => {
      con.query(sql, param, function (err, rows, fields) {
        if (err) {
          console.log(err);
        } else {
          console.log(`"${content}" => has been added`);
          //쿼리에 성공한 후 이력이 정상적으로 추가되었음을 출력한다.
        }
      });
      con.release();
      //Connection Pool에 con을 release해줘야한다.
      res.end();
      //res.end()를 하지 않으면, post작업을 한 번 더 실행하는 nodejs의 특성때문에 반드시 필요한 명령어이다.
    });
  } catch (e) {
    console.log(e);
  }
  return;
});

module.exports = router;
