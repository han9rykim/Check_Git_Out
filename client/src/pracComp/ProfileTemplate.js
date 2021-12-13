// import React from "react";
// import styled from "styled-components";

// const profileData = {
// 	dblepart99: {
// 		name: "김현수",
// 		description: "Data Network Lab",
// 	},

// 	longnew: {
// 		name: "롱뉴",
// 		description: "백수",
// 	},
// };

// const TemplateBlock = styled.div`
// 	width: 512px;
// 	height: 768px;

// 	position: relative;
// 	background: white;
// 	border-radius: 16px;
// 	box-shadow: 0 0 8px rgba(0, 0, 0, 0.04);
// 	margin: 0 auto;
// 	margin-top: 96px;
// 	margin-bottom: 32px;

// 	display: flex;
// 	flex-direction: column;
// `;

// function ProfileTemplate({ match }) {
// 	const { username } = match.params;
// 	const profile = profileData[username];

// 	if (!profile) {
// 		return <div>존재하지 않는 사용자입니다.</div>;
// 	}

// 	return (
// 		<div>
// 			<TemplateBlock>
// 				<h1>Your Profile</h1>
// 				<h3>
// 					{username} ({profile.name})
// 				</h3>
// 				<p>{profile.description}</p>
// 			</TemplateBlock>
// 		</div>
// 	);
// }

// export default ProfileTemplate;
