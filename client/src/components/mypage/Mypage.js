import axios from "axios";
import React from 'react';
import { useAsync } from "react-async";
import { Octokit } from "@octokit/rest";

async function m1() {
    const response = JSON.parse(localStorage.getItem("response"));
	const token = response.data.access_token;
	const octokit = new Octokit({
		auth: String(token),
	});
	const { data } = await axios.get("https://api.github.com/user", {
		headers: {
			Authorization: `token ${token}`,
		},
	});
	const owner = data.login;

	const tmProfile = await octokit.request(
		"GET /repos/{owner}/{repo}/contents/{path}",
		{
			owner: owner,
			repo: `${owner}Resume`,
			path: "README.md",
		}
	);
	return atob(tmProfile.data.content);
}

function Mypage() {
    
    const value = m1();
    console.log(value);
    return (
        <div>
            <h1>{value.PromiseResult}</h1>
        </div>
    );
}

export default Mypage;