import axios from "axios";
import React from "react";
import { useAsync } from "react-async";
import { Octokit } from "@octokit/rest";

async function m1() {
  // const response = JSON.parse(localStorage.getItem("response"));
  const token = localStorage.getItem("access_token");
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
  const url = localStorage.getItem("ProfileURL");

  return (
    <div>
      <img src={url} />
    </div>
  );
}

export default Mypage;

// import axios from "axios";
// import React from "react";
// import { useAsync } from "react-async";
// import { Octokit } from "@octokit/rest";

// async function m1() {
//   // const response = JSON.parse(localStorage.getItem("response"));
//   const token = localStorage.getItem("access_token");
//   const octokit = new Octokit({
//     auth: String(token),
//   });
//   const { data } = await axios.get("https://api.github.com/user", {
//     headers: {
//       Authorization: `token ${token}`,
//     },
//   });
//   const owner = data.login;

//   const tmProfile = await octokit.request(
//     "GET /repos/{owner}/{repo}/contents/{path}",
//     {
//       owner: owner,
//       repo: `${owner}Resume`,
//       path: "README.md",
//     }
//   );
//   return atob(tmProfile.data.content);
// }

// function Mypage() {
//   var value = "";
//   if (localStorage.getItem("response")) {
//     value = m1();
//     console.log(value);
//     console.log("뭐라도 정보는 있고만");
//   }

//   const result = value.PromiseResult;
//   console.log(result);

//   return (
//     <div>
//       <h1>로그인 되었습니다.</h1>
//       <h1>{result}</h1>
//     </div>
//   );
// }

// export default Mypage;
