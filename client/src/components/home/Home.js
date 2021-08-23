import React from "react";
import ResumeProfile from "../resume/ResumeProfile";
import styled, { createGlobalStyle } from "styled-components";
import { Button, Form, FormControl, Nav } from "react-bootstrap";
import { Link, Route } from "react-router-dom";

const TemplateBlock = styled.div`
  width: 920px;
  height: 1400px;
  position: relative;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.04);
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 32px;
  padding-top: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
`;
const SearchBlock = styled.div`
  position: relative;
  width: 920px;
  height: 40px;
  margin: 0 auto;
  margin-top: 30px;
  padding-right: 20px;
  padding-left: 20px;
`;
const handleSearch = () => {};

function Home() {
  const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo,admin:repo_hook,admin:org`;
  var isLogin = false;
  if (localStorage.getItem("ProfileURL")) {
    isLogin = true;
  }

  return (
    <div>
      {/* <SearchBlock>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="mr-2"
            aria-label="Search"
            // value={title}
          />
          <Button onClick={() => handleSearch()}>Search</Button>
        </Form>
      </SearchBlock> */}

      <br />
      <div>
        {isLogin ? (
          <logouttag>
            <h1>Check Git Out!</h1>
            <TemplateBlock>
              <ResumeProfile />
            </TemplateBlock>
          </logouttag>
        ) : (
          <div>
            <h1>Check Git Out!</h1>
            <h1>Github를 활용한 학생 이력관리 서비스</h1>
            <br />
            <h3>Github를 이용하여 여러분의 이력을 관리해드립니다.</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
