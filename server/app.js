require("dotenv").config();
const axios = require("axios");
const app = require("express")();
const bodyParser = require("body-parser");

const port = 8080;
const cors = require("cors");
const mysql = require("mysql");

const authRouter = require("./auth/auth");
// const mysqlRouter = require("./db/mysql");
const prRouter = require("./pullrequest/prRouter");
app.use(cors());
app.use(bodyParser.json());

// app.get("/", async (req, res) => {
//   res.send("<h1>hello</h1>");
// });

/*
SERVER OPEN
*/

/*
authorization part
*/

// app.use("/mysql", mysqlRouter);
app.use("/auth", authRouter);
app.use("/pullrequest", prRouter);
// app.use("/commit", commitRouter);

// const Octokit = require("octokit");
// app.post("/auth", async (req, res) => {
//   const { code } = req.body;
//   console.log(`resource owner가 보낸 코드: ${code}`);
//   console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);

//   try {
//     const response = await axios.post(
//       "https://github.com/login/oauth/access_token",
//       {
//         code: code,
//         client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
//         client_secret: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
//       },
//       {
//         headers: {
//           accept: "application/json",
//         },
//       }
//     );
//     // console.log(JSON.stringify(response.data));

//     const token = response.data.access_token;

//     const { data } = await axios.get("https://api.github.com/user", {
//       headers: {
//         Authorization: `token ${token}`,
//       },
//     });

//     const owner = data.login;
//     console.log(owner);

//     var sql = `INSERT INTO user(username, type, token)	VALUES (?,?,?)`;
//     var param = [owner, "null", token];
//     con.query(sql, param, function (err, rows, fields) {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log("rows", rows);
//         console.log("fields", fields);
//       }
//     });

//     console.log(`resource server가 보내준 토큰: ${token}`);
//     res.send(response.data);
//   } catch (err) {
//     console.log("error occured");
//     console.error(err);
//   }
// });

// app.post("/pullrequest", async (req, res) => {
//   const { sendReq } = req.body;
//   console.log(sendReq);

//   //   con.end();
// });

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
