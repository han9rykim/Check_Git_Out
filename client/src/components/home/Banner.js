import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
} from "react-bootstrap";

function Banner({ flag }) {
  const [isLogin, setIsLogin] = useState(false);
  const [imgURL, setImgURL] = useState("");
  const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo,admin:repo_hook,admin:org`;

  // const [token, setToken] = useState("");
  // const [token, setToken] = localStorage.getItem("access_token");
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (token) {
      setIsLogin(true);
      console.log(`11111+${isLogin}`);
      setImgURL(localStorage.getItem("ProfileURL"));
      console.log(imgURL);
    }
    console.log(isLogin);
  }, [token]);

  const handleLogOut = () => {
    setIsLogin(false);
    localStorage.removeItem("access_token");
    localStorage.removeItem("data");
    localStorage.removeItem("username");
    localStorage.removeItem("ProfileURL");
  };
  // const handleLogin = () => {
  //   setIsLogin(true);
  //   // setProfileURL(null);
  // };

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
              <accountdiv>
                {isLogin ? (
                  <logouttag onClick={() => handleLogOut()}>
                    <Nav.Link href="/">
                      <img src={imgURL} width="30px" height="30px" />
                      Logout
                    </Nav.Link>
                  </logouttag>
                ) : (
                  <logintag>
                    <Nav.Link href={url}>Login</Nav.Link>
                  </logintag>
                )}
              </accountdiv>
              <NavDropdown title="Setting" id="navbarScrollingDropdown">
                <accountdiv>
                  {isLogin ? (
                    <logouttag>
                      <NavDropdown.Item href="/mypage">
                        My Page
                      </NavDropdown.Item>
                    </logouttag>
                  ) : (
                    <logintag></logintag>
                  )}
                </accountdiv>
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
