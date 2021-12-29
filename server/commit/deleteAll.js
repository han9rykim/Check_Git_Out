var express = require("express");
var router = express.Router();
const getConnection = require("../db/database");
//mysql connection을 가져온다.

router.post("/", async (req, res) => {
  const response = req.body;
  // console.log(response);
  var sql = "DELETE FROM commitlog WHERE stu_username=?";
  //commitlog 테이블에서 해당학생에 대한 모든 이력을 삭제하는 명령어.
  var params = [response.headers.stuname];

  await getConnection((con) => {
    con.query(sql, params, function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        console.log("Deleted ALL");
      }
    });
    con.release();
  });
  // query문을 수행한다.
  res.end();
});

module.exports = router;
