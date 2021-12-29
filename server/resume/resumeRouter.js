// var express = require("express");
// var router = express.Router();
// const axios = require("axios");
// const Octokit = require("octokit");
// var express = require("express");
// var router = express.Router();
// const getConnection = require("../db/database");

// /* post auth. */
// // router.get("/", function (req, res, next) {
// // 	res.render("index", { title: "AUTH page" });
// // });

// router.post("/", async (req, res) => {
//   try {
//     var sql = "SELECT (username) FROM user";
//     var param = [];

//     getConnection((con) => {
//       con.query(sql, function (err, rows, fields) {
//         if (err) {
//           console.log(err);
//         } else {
//           res.send(rows);
//         }
//       });
//       con.release();
//     });
//   } catch (err) {
//     console.log("error occured");
//     console.error(err);
//   }
//   con.end();
//   console.log("studentinfo connect end");
//   res.end();
// });

// module.exports = router;
