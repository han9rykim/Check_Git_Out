var express = require("express");

var router = express.Router();
const axios = require("axios");
const Octokit = require("octokit");
var express = require("express");
var router = express.Router();
var mysql = require("mysql");

/* post auth. */
// router.get("/", function (req, res, next) {
// 	res.render("index", { title: "AUTH page" });
// });

router.post("/", async (req, res) => {
  const { code } = req.body;
  console.log(`resource owner가 보낸 코드: ${code}`);
  console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);

  try {
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        code: code,
        client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
        client_secret: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
      },
      {
        headers: {
          accept: "application/json",
        },
      }
    );
    // console.log(JSON.stringify(response.data));

    const token = response.data.access_token;

    const { data } = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    const owner = data.login;
    console.log(owner);

    const con = mysql.createConnection({
      host: "localhost",
      user: "root",
      port: 3306,
      password: "",
      database: "gResume",
    });

    con.connect(function (err) {
      if (err) throw err;
      console.log("Connected");
    });

    var sql = `INSERT INTO user(username, type, token)	VALUES (?,?,?)`;
    var param = [owner, "null", token];
    con.query(sql, param, function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        console.log("rows", rows);
        console.log("fields", fields);
      }
    });
    con.end();

    console.log(`resource server가 보내준 토큰: ${token}`);
    res.send(response.data);
  } catch (err) {
    console.log("error occured");
    console.error(err);
  }
});

module.exports = router;
