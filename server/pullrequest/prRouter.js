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
	const { sendReq } = req.body;
	console.log(sendReq);

	try {
	} catch (err) {
		console.log("error occured");
		console.error(err);
	}
});

module.exports = router;
