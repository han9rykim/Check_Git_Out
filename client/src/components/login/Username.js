import React from 'react';

function Username(props) {
    const data = localStorage.getItem("data");
    // const user = data.login;
    // const image = data.avatar_url;
    // const name = data.name;
    // console.log(data);
		
    return (
			<div>
				<h1>로그인을 축하합니다.</h1>
				{/* <h2>{user}</h2> */}
				<h2>{data}</h2>
				{/* <img src={image} /> */}
				{/* <Link to="/">
					<form onSubmit={handleSubmit}>
						<button onClick={localStorage.removeItem("data")}>로그아웃</button>
					</form>
				</Link> */}
			</div>
		);
}

export default Username;