import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./Banner.css";

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
      <div className="BannerBlock">
        <div className="LetterTemplate"></div>
        <Link to="/">
          <div className="CnuLogoBlock" />
        </Link>
        <Link to="/mypage">
          <button className="MypageBtn">
            <div className="LetterTemplate">My Page</div>
          </button>
        </Link>

        {/* <Link to="/resume">
          <button className="ResumeBtn">
            <div className="LetterTemplate">Resume</div>
          </button>
        </Link> */}

        <input
          className="SearchBlock"
          type="text"
          id="header-search"
          placeholder="Search student name here"
          name="resume"
          value={searchUser}
          onChange={handleChange}
          onKeyPress={onKeyPress}
        ></input>
        <button className="SearchBtn" onClick={() => handleSearch()}>
          <div className="LetterTemplate">Search</div>
        </button>
        {/* <a href={searchUser}></a> */}
        <accountdiv>
          {isLogin ? (
            <logouttag onClick={() => handleLogOut()}>
              <Link to="/">
                <button className="LoginBtn">
                  <div className="LetterTemplate">Logout</div>
                </button>
              </Link>
              <div className="IconBlock">
                <img src={imgURL} alt="Profile" width="30px" height="30px" />
              </div>
            </logouttag>
          ) : (
            <logintag>
              <a href={url}>
                <button className="LoginBtn">
                  <div className="LetterTemplate">Login</div>
                </button>
              </a>
              <div className="IconBlock">
                <img
                  src="https://user-images.githubusercontent.com/39149858/130719648-7ac10111-c896-4be4-a4fe-393a824c6c21.png"
                  alt="Profile"
                  width="30px"
                  height="30px"
                />
              </div>
              {/* <a href={url}></a> */}
            </logintag>
          )}
        </accountdiv>
      </div>
    </div>
  );
}

export default Banner;
