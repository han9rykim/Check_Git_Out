import { React } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

function Banner() {
	const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID; //
	const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo,admin:repo_hook,admin:org`;
	return (
		<div>
			<Navbar bg="dark" variant="dark" expand="lg">
				<Navbar.Toggle aria-controls="navbarScroll" />

				<Container>
					<Navbar.Collapse id="navbarScroll">
						<Navbar.Brand href="/">Home</Navbar.Brand>
						<Nav
							className="me-auto"
							style={{ maxHeight: "100px" }}
							navbarScroll
						>
							<Nav.Link href="/about">About</Nav.Link>
							<Nav.Link href="/resume">Resume</Nav.Link>
							<Nav.Link href="/rank">Rank</Nav.Link>
							<Nav.Link href="/mypage">My Page</Nav.Link>
							<Nav.Link href={url}>Login</Nav.Link>
							<NavDropdown title="Setting" id="navbarScrollingDropdown">
								<NavDropdown.Item href="/profiles">Profile</NavDropdown.Item>
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
				</Container>
			</Navbar>
		</div>
	);
}

export default Banner;
