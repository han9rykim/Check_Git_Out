require("dotenv").config();
const app = require("express")();
const bodyParser = require("body-parser");

const port = 3001;
const cors = require("cors");

const authRouter = require("./auth/auth");
const mysqlRouter = require("./db/mysql");

app.use(cors());

app.use(bodyParser.json());

app.get("/", async (req, res) => {
	res.send("<h1>hello</h1>");
});
/*
SERVER OPEN
*/

/*
authorization part
*/

app.use("/mysql", mysqlRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});
