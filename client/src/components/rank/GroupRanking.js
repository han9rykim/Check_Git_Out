import React from "react";
import { Route, Link } from "react-router-dom";

function GroupRanking() {
	return (
		<div>
			<Link to="/groupranking">
				<h1>그룹</h1>
			</Link>
			<Link to="/Ranking">
				<h1>유저</h1>
			</Link>

			<h1>Group Ranking</h1>

			

			<Link to="/profiles/kaist">
				<h3>1 KAIST</h3>
			</Link>

			<Link to="/profiles/cnu">
				<h3>2 CNU</h3>
			</Link>

			<Link to="/profiles/facebook">
				<h3>3 FACEBOOK</h3>
			</Link>

			<Link to="/profiles/webo">
				<h3>4 WEBO</h3>
			</Link>

			<Link to="/profiles/samsung">
				<h3>5 SAMSUNG</h3>
			</Link>

		</div>
	);
}

export default GroupRanking;
