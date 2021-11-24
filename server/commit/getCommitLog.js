var express = require("express");
var router = express.Router();
const axios = require("axios");
var express = require("express");
var router = express.Router();
const getConnection = require("../db/database");

router.post("/", async (req, res) => {
  const student = req.body;
  //   console.log(student.username);
  var sql = "SELECT * FROM commitlog WHERE stu_username=?";
  var params = [student.username];
  var sendContent = "";
  let tmpList = [];
  try {
    await getConnection((con) => {
      con.query(sql, params, function (err, rows, fields) {
        //두번째 인자에 배열로 된 값을 넣어줄 수 있다.
        if (err) {
          console.log(err);
        } else {
          if (rows.length == 0) {
            console.log("시바");
            try {
            } catch (err) {
              res.send("내용이 아직 없습니다.");
            }
          } else {
            for (let i = 0; i < rows.length; i++) {
              tmpList.push({
                writer: `${rows[i].username}`,
                student: `${rows[i].stu_username}`,
                content: `${rows[i].content}`,
              });
              sendContent += `writer: ${rows[i].username},
                student: ${rows[i].stu_username},
                content: ${rows[i].content}`;
            }
            console.log(tmpList);
            res.status(200).json({ status: "success", data: tmpList });
            res.end();
          }
        }
      });
      con.release();
    });
  } catch (err) {
    console.log(err);
  }
  return;
});

module.exports = router;
