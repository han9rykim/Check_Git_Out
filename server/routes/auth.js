require("dotenv").config();
var express = require('express');
var router = express.Router();

/* post auth. */
router.post("/auth", async (req, res) => {
    console.log("시발");
	const { code } = req.body;
	console.log(`resource owner가 보낸 코드: ${code}`);

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
	console.log(`resource server가 보내준 토큰: ${token}`);

	res.send(response.data);
});

module.exports = router;




