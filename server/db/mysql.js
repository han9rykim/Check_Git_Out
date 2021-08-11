/*
Database 
*/
var express = require("express");
var router = express.Router();
var mysql = require("mysql");

router.get("/", function (req, res, next) {
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
	con.end();
});

module.exports = router;
