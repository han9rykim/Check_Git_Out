import {React, useEffect} from "react";
import Profile from "./Profile";
import { Link, Route } from "react-router-dom";

function Profiles({history}) {

	const goBack = () => {
		history.goBack();
	};

	return (
		<div>
			<Route
				path="/profiles"
				exact
				render={() => <div>사용자를 선택해주세요</div>}
			/>

			<Link to="/groupranking">
				<h1>그룹</h1>
			</Link>
			<Link to="/Ranking">
				<h1>유저</h1>
			</Link>

			<h1>Ranking</h1>
			<button onClick={goBack}>뒤로가기</button>

			<Route path="/profiles/:username" component={Profile} />
		</div>
	);
}

export default Profiles;
