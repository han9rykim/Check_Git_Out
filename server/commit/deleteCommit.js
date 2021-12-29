var express = require("express");
var router = express.Router();
const getConnection = require("../db/database");

router.post("/", async (req, res) => {
  const response = req.body;
  console.log(response);
  var sql =
    "DELETE FROM commitlog WHERE stu_username=? and username=? and content=?";
  // commitlog 테이블에서 구직자의 이름, 추천자의 이름, 이력 내용이 맞는 것을 찾아서 삭제한다.
  var params = [
    response.header.stuname,
    response.header.prof,
    response.header.content,
  ];

  getConnection((con) => {
    con.query(sql, params, function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        console.log(`Deleted Only Yours`);
      }
    });
    // 쿼리문 수행.
    con.release();
  });

  res.end();
});

module.exports = router;
