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
const resumeRouter = require("./resume/resumeRouter");
app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRouter);
app.use("/pullrequest", prRouter);
app.use("/studentinfo", resumeRouter);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
