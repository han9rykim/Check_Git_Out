var express = require("express");
var router = express.Router();
const axios = require("axios");
const Octokit = require("octokit");
var express = require("express");
var router = express.Router();
const getConnection = require("../db/database");

/* post auth. */
// router.get("/", function (req, res, next) {
// 	res.render("index", { title: "AUTH page" });
// });

router.post("/", async (req, res) => {
  try {
    const { sendReq } = req.body;
    console.log(`${sendReq}`);

    const id = `${sendReq.title}${sendReq.student}`;
    const content = `<br/>  [${sendReq.date}] [${sendReq.title}] - ${sendReq.description}`;
    // console.log(content);
    // console.log(id);
    var sql =
      "INSERT INTO commitlog(username, id, content, stu_username, token) VALUES(?,?,?,?,?) ON DUPLICATE KEY UPDATE content = (?)";
    var param = [
      sendReq.admin,
      id,
      content,
      sendReq.student,
      sendReq.token,
      content,
    ];

    await getConnection((con) => {
      con.query(sql, param, function (err, rows, fields) {
        if (err) {
          console.log(err);
        } else {
          console.log(`"${content}" => has been added`);
        }
      });
      con.release();
      res.end();
    });
  } catch (e) {
    console.log(e);
  }
  return;
});

module.exports = router;
