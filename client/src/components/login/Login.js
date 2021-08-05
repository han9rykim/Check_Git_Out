import React from "react";



function Login(props) {
	const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;//
	
	const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo,admin:repo_hook,admin:org`;
	
	// GITHUB_CLIENT_ID는 GitHub OAuth에 어플리케이션 등록 후 발급받은 ID입니다.
	// CLIENT_CALLBACK_URL은 어플리케이션 등록 시 설정한 URL이며,
	// 해당 URL에 code를 쿼리 스트링으로 GitHub 서버가 리다이렉트 시켜줍니다.

	return (
		<a href={url}>{url}</a>
		// 유저를 GitHub 인증 페이지로 이동시켜서 로그인하게 합니다.
		// 로그인이 성공하면 redirect_uri로 지정된 URL에 code가 쿼리스트링으로 붙은 채로 리다이렉트됩니다.
	);
}

export default Login;


