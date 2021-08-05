import { React } from "react";
// import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
// import styled from "styled-components";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

function Banner() {
	// const clientId = "21c38529095880d2a21a";
	// const callbackURL = "http://168.188.129.200:3000/callback";

	// const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
	// const callbackURL = process.env.REACT_APP_CLIENT_CALLBACK_URL;
	
	return (
		<div>
			<Nav.Link href="/">
				<h1>Github 이력 관리 시스템</h1>
			</Nav.Link>

			<Navbar bg="light" expand="lg">
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav
						className="mr-auto my-2 my-lg-0"
						style={{ maxHeight: "100px" }}
						navbarScroll
					>
						<Nav.Link href="/about">About</Nav.Link>
						<Nav.Link href="/resume">Resume</Nav.Link>
						<Nav.Link href="/rank">Rank</Nav.Link>
						<Nav.Link href="/mypage">My Page</Nav.Link>
						<NavDropdown title="Setting" id="navbarScrollingDropdown">
							<NavDropdown.Item href="/profiles">Profile</NavDropdown.Item>
							<NavDropdown.Item href="/login">Login</NavDropdown.Item>
						</NavDropdown>
					</Nav>
					<Form className="d-flex">
						<FormControl
							type="search"
							placeholder="Search"
							className="mr-2"
							aria-label="Search"
						/>
						<Button variant="outline-success">Search</Button>
					</Form>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
}

export default Banner;
