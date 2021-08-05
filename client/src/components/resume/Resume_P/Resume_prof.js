import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

function Resume_prof(props) {
	const [startDate, setStartDate] = useState(new Date());
    return (
			<div>
				<DropdownButton id="dropdown-basic-button" title="Dropdown button">
					<Dropdown.Item href="#/action-1">과목1</Dropdown.Item>
					<Dropdown.Item href="#/action-2">과목2</Dropdown.Item>
					<Dropdown.Item href="#/action-3">과목3</Dropdown.Item>
				</DropdownButton>

				<h1></h1>

				<li>김현수</li>
				
				<input classname="searchinput" type="text" placeholder="활동명" />
				<DatePicker
					selected={startDate}
					onChange={(date) => setStartDate(date)}
				/>
				<button>Pull Request</button>

				<button>학생 추가하기</button>
			</div>
		);
}

export default Resume_prof;
