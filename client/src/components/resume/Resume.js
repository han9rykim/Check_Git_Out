import React from "react";
import { Route, Link } from "react-router-dom";
import Resume_prof from "./Resume_P/Resume_prof";
import Resume_stu from "./Resume_S/Resume_stu";

const profileData = {
	dblepart99: {
		name: "김현수",
		description: "BS in CNU",
		rank: 43,
		score: 90,
		imagelink:
			"https://user-images.githubusercontent.com/39149858/124225857-18c83d80-db43-11eb-83dc-0ca580a79841.jpeg",

	}
}



function Resume() {
	return (
		<div>
			<h1>이력서 페이지</h1>
            <Resume_prof></Resume_prof>
            <Resume_stu></Resume_stu>

		</div>
        
	);
}

export default Resume;
