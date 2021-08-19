// var express = require("express");
// // const app = require("express")();
// const axios = require("axios");
// const router = express.Router();

// router.post("/auth", async (req, res) => {
// 	const { code } = req.body;

//     const client_id = process.env.REACT_APP_GITHUB_CLIENT_ID;
//     const client_secret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;

// 	const response = await axios.post(
// 		"https://github.com/login/oauth/access_token",
// 		{
// 			code,
// 			client_id, // 내 APP의 정보
// 			client_secret, // 내 APP의 정보
// 		},
// 		{
// 			headers: {
// 				accept: "application/json",
// 			},
// 		}
// 	);

// 	// GITHUB에서 제공하는 다양한 API에 접근할 수 있는 토큰 정보를 취득할 수 있습니다.
// 	const token = response.data.access_token;

// 	const { data } = await axios.get("https://api.github.com/user", {
// 		headers: {
// 			Authorization: `token ${token}`,
// 		},
// 	});

// 	// data의 정보를 활용하여 자신의 애플리케이션에 필요한 정보를 DB에 저장해주세요.

// 	// JWT 토큰을 발행합니다.
// 	// const access_token = await jwt.generate({ login: data.login, id: data.id });
// 	console.log(token);

// 	// return res.json({ access_token });
//     return null;
// });
