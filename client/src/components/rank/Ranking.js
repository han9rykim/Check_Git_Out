import React from "react";
import styled from "styled-components";
import { Route, Link } from "react-router-dom";
import Profile from "../profile/Profile";

const Rank = styled.div`
	flex: 1;
	margin-left: auto;
	margin-right: auto;
    div.button{
        margin:auto;
    }

`;



function Ranking(props) {
	return (
		

		<div>
			<Link to="/groupranking">
				<h1>그룹</h1>
			</Link>
			<Link to="/Ranking">
				<h1>유저</h1>
			</Link>

			<h1>Ranking</h1>

			<Link to="/profiles/dblepart99">
				<h3>1 kim Hyunsoo</h3>
			</Link>

			<Link to="/profiles/mark_zuckerberg">
				<h3>2 mark_zuckerberg</h3>
			</Link>

			<Link to="/profiles/Prof_lee">
				<h3>3 Lee YoungSeok</h3>
			</Link>

			<Link to="/profiles/dblepart99">
				<h3>4 kim</h3>
			</Link>

			<Link to="/profiles/mark_zuckerberg">
				<h3>5 Zuckerberg</h3>
			</Link>

			<Route path="/profiles/:username" component={Profile} />
		</div>
	);
}

export default Ranking;
