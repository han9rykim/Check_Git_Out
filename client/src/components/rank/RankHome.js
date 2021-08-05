import React from 'react';
import { Link, Route } from "react-router-dom";
function RankHome(props) {
    return (
			<div>
				<Link to="/groupranking">
					<h1>그룹</h1>
				</Link>
				<Link to="/Ranking">
					<h1>유저</h1>
				</Link>
                <h2>choose the category what you wanna see</h2>
			</div>
		);
}

export default RankHome;