// import React from "react";
// import styled from "styled-components";

// const profileData = {
// 	dblepart99: {
// 		name: "김현수",
// 		description: "BS in CNU",
// 		rank: 43,
// 		score: 90,
// 		imagelink:
// 			"https://user-images.githubusercontent.com/39149858/124225857-18c83d80-db43-11eb-83dc-0ca580a79841.jpeg",
// 	},

// 	mark_zuckerberg: {
// 		name: "마크 주커버그",
// 		description: "facebook CEO",
// 		rank: 23,
// 		score: 120,
// 		imagelink:
// 			"https://w7.pngwing.com/pngs/290/946/png-transparent-mark-zuckerberg-facebook-f8-icon-mark-zuckerberg-celebrities-tshirt-microphone-thumbnail.png",
// 	},

// 	Prof_lee: {
// 		name: "이영석",
// 		description: "Prof. CNU",
// 		rank: 3,
// 		score: 210,
// 		imagelink:
// 			"https://yt3.ggpht.com/ytc/AKedOLR-EYbCIlbFJDfcXcpLB_z93Cvt2kkkN3N0RLbozTA=s88-c-k-c0x00ffffff-no-rj",
// 	},
// 	kaist:{
// 		name: "kaist",
// 		description: "충대 옆 학교",
// 		rank: 1,
// 		score: 210,
// 	},
// 	cnu:{
// 		name: "cnu",
// 		description: "학교",
// 		rank: 2,
// 		score: 200,

// 	},
// 	facebook:{
// 		name: "facebook",
// 		description: "책 만드는 회사",
// 		rank: 3,
// 		score: 110,

// 	},
// 	webo:{
// 		name: "webo",
// 		description: "중국 회사",
// 		rank: 4,
// 		score: 80,

// 	},
// 	samsung:{
// 		name: "samsung",
// 		description: "전자제품 회사",
// 		rank: 5,
// 		score: 70,
// 	}
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

// function Profile({ match }) {
// 	const { username } = match.params;
// 	const profile = profileData[username];

// 	if (!profile) {
// 		return <div>존재하지 않는 사용자입니다.</div>;
// 	}

// 	return (
// 		<TemplateBlock>
// 			<h1>Profile</h1>
// 			<h3>
// 				{username} ({profile.name})<br />
// 				{profile.description}
// 				<br />
// 				이번 주 점수 : {profile.score}
// 				<br />
// 				이번 주 랭킹: 상위 {profile.rank}%
// 			</h3>

// 			<img src={profile.imagelink} />

// 		</TemplateBlock>
// 	);
// }

// export default Profile;
