import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LetterTemplate = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 30px;
  color: #ffffff;
`;

const BannerBlock = styled.div`
  position: absolute;
  width: 100%;
  height: 50px;
  left: 0px;
  top: 0px;

  background: #c4c4c4;
`;

const CnuLogoBlock = styled.div`
  position: absolute;
  width: 180px;
  height: 34px;
  left: 11px;
  top: 8px;
  background: url("https://user-images.githubusercontent.com/39149858/130719419-5fa0003e-b3e1-4743-bc08-34e3fe735028.png");
  background-size: 100%;
`;
//border-color: #c4c4c4;
const MypageBtn = styled.button`
  position: absolute;
  width: 111px;
  height: 34px;
  left: 223px;
  top: 8px;

  background: rgba(22, 65, 148, 0.8);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

const ResumeBtn = styled.button`
  position: absolute;
  width: 111px;
  height: 34px;
  left: 366px;
  top: 8px;

  background: rgba(22, 65, 148, 0.8);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

const SearchBlock = styled.input`
  position: absolute;
  width: 321px;
  height: 34px;
  left: 729px;
  top: 9px;

  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

const SearchBtn = styled.button`
  position: absolute;
  width: 111px;
  height: 34px;
  left: 1069px;
  top: 9px;

  background: rgba(22, 65, 148, 0.8);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

const LoginBtn = styled.button`
  position: absolute;
  width: 111px;
  height: 34px;
  left: 1550px;
  top: 9px;

  background: rgba(22, 65, 148, 0.8);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

const IconBlock = styled.div`
  position: absolute;
  width: 35px;
  height: 35px;
  left: 1510px;
  top: 8px;
`;

function Banner({ history }) {
  const [searchUser, setSearchUser] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [imgURL, setImgURL] = useState("");
  const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo,admin:org`;

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (token) {
      setIsLogin(true);
      // console.log(`11111+${isLogin}`);
      setImgURL(localStorage.getItem("ProfileURL"));
      // console.log(imgURL);
    }
    // console.log(isLogin);
  }, [token]);
  const handleChange = ({ target: { value } }) => {
    setSearchUser(value);
    console.log(`${searchUser}`);
  };

  const handleLogOut = () => {
    setIsLogin(false);
    localStorage.removeItem("access_token");
    localStorage.removeItem("data");
    localStorage.removeItem("username");
    localStorage.removeItem("ProfileURL");
  };
  const handleSearch = () => {
    window.location.href = "/resume/" + searchUser;
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const altImg = "img/GithubLogo.png";

  return (
    <div>
      <BannerBlock>
        <LetterTemplate></LetterTemplate>
        <Link to="/">
          <CnuLogoBlock />
        </Link>
        <Link to="/mypage">
          <MypageBtn>
            <LetterTemplate>MyPage</LetterTemplate>
          </MypageBtn>
        </Link>

        {/* <Link to="/resume">
          <ResumeBtn>
            <LetterTemplate>Resume</LetterTemplate>
          </ResumeBtn>
        </Link> */}

        <SearchBlock
          type="text"
          id="header-search"
          placeholder="Search student name here"
          name="resume"
          value={searchUser}
          onChange={handleChange}
          onKeyPress={onKeyPress}
        ></SearchBlock>
        <SearchBtn onClick={() => handleSearch()}>
          <LetterTemplate>Search</LetterTemplate>
        </SearchBtn>
        {/* <a href={searchUser}></a> */}
        <accountdiv>
          {isLogin ? (
            <logouttag onClick={() => handleLogOut()}>
              <IconBlock>
                <img src={imgURL} alt="Profile" width="30px" height="30px" />
              </IconBlock>
              <Link to="/">
                <LoginBtn>
                  <LetterTemplate>Logout</LetterTemplate>
                </LoginBtn>
              </Link>
            </logouttag>
          ) : (
            <logintag>
              <IconBlock>
                <img
                  src="https://user-images.githubusercontent.com/39149858/130719648-7ac10111-c896-4be4-a4fe-393a824c6c21.png"
                  alt="Profile"
                  width="30px"
                  height="30px"
                />
              </IconBlock>
              <a href={url}>
                <LoginBtn>
                  <LetterTemplate>Login</LetterTemplate>
                </LoginBtn>
              </a>
              {/* <a href={url}></a> */}
            </logintag>
          )}
        </accountdiv>
      </BannerBlock>
    </div>
  );
}

export default Banner;

// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   Container,
//   Row,
//   Col,
//   Navbar,
//   Nav,
//   NavDropdown,
//   Form,
//   FormControl,
// } from "react-bootstrap";
// import styled from "styled-components";

// const Block = styled.div`
//   justify-content: center;
// `;

// function Banner() {
//   const [isLogin, setIsLogin] = useState(false);
//   const [imgURL, setImgURL] = useState("");
//   const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
//   const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo,admin:repo_hook,admin:org`;

//   const token = localStorage.getItem("access_token");

//   useEffect(() => {
//     if (token) {
//       setIsLogin(true);
//       // console.log(`11111+${isLogin}`);
//       setImgURL(localStorage.getItem("ProfileURL"));
//       // console.log(imgURL);
//     }
//     // console.log(isLogin);
//   }, [token]);

//   const handleLogOut = () => {
//     setIsLogin(false);
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("data");
//     localStorage.removeItem("username");
//     localStorage.removeItem("ProfileURL");
//   };

//   return (
//     <div>
//       <Block>
//         <Navbar bg="light" variant="light" expand="xxl">
//           <Navbar.Toggle aria-controls="navbarScroll" />

//           <Container>
//             <Navbar.Collapse id="navbarScroll">
//               <Navbar.Brand href="/">
//                 <img src="img/logo_CNU.png" height="40px" />
//               </Navbar.Brand>
//               <Nav
//                 className="me-auto"
//                 style={{ maxHeight: "100px" }}
//                 navbarScroll
//               >
//                 <Nav.Link href="/about">About</Nav.Link>
//                 <Nav.Link href="/resume">Resume</Nav.Link>
//                 {/* <Nav.Link href="/rank">Rank</Nav.Link> */}
//                 <Nav.Link href="/mypage">My Page</Nav.Link>
//                 <accountdiv>
//                   {isLogin ? (
//                     <logouttag onClick={() => handleLogOut()}>
//                       <Nav.Link href="/">
//                         <img src={imgURL} width="30px" height="30px" />
//                         Logout
//                       </Nav.Link>
//                     </logouttag>
//                   ) : (
//                     <logintag>
//                       <Nav.Link href={url}>Login</Nav.Link>
//                     </logintag>
//                   )}
//                 </accountdiv>
//                 {/* <NavDropdown title="Setting" id="navbarScrollingDropdown">

//                 </NavDropdown> */}
//               </Nav>
//             </Navbar.Collapse>
//           </Container>
//         </Navbar>
//       </Block>
//     </div>
//   );
// }

// export default Banner;
