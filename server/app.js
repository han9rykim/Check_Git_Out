require("dotenv").config();
const axios = require("axios");
const app = require("express")();
const bodyParser = require("body-parser");

const port = 8080;
const cors = require("cors");
const mysql = require("mysql");

const authRouter = require("./auth/auth");
const prRouter = require("./pullrequest/prRouter");
const commitRouter = require("./commit/commitLogRouter");
const getCommitRouter = require("./commit/getCommitLog");
const makecommitRouter = require("./commit/makeCommit");
const deleteCommitRouter = require("./commit/deleteCommit");
const deleteAllRouter = require("./commit/deleteAll");
const checkPRRouter = require("./pullrequest/checkPR");
const mergeRouter = require("./merge/merge");

app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRouter);
app.use("/addcommitlog", commitRouter);
app.use("/getcommitlog", getCommitRouter);
app.use("/pullrequest", prRouter);
app.use("/makecommit", makecommitRouter);
app.use("/deletecommit", deleteCommitRouter);
app.use("/deleteall", deleteAllRouter);
app.use("/checkPR", checkPRRouter);
app.use("/merge", mergeRouter);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
