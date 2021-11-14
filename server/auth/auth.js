var express = require("express");
var router = express.Router();
const axios = require("axios");
var express = require("express");
var router = express.Router();
const getConnection = require("../db/database");

router.post("/", async (req, res) => {
  const { code } = req.body;
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

  const token = response.data.access_token;

  const { data } = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: `token ${token}`,
    },
  });

  res.send(response.data);
  const owner = data.login;
  // console.log(owner);

  // var sql = `INSERT INTO user(username, type, token)	VALUES (?,?,?)`;
  var sql =
    "INSERT INTO user(username, token) VALUES(?,?) ON DUPLICATE KEY UPDATE token = (?)";
  var param = [owner, token, token];
  getConnection((con) => {
    con.query(sql, param, function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        // console.log("rows", rows);
        // console.log("fields", fields);
      }
    });
    con.release();
  });

  console.log(`resource server가 보내준 토큰: ${token}`);
  res.end();
});

module.exports = router;
