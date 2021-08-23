import React from "react";
import ResumeProfile from "../resume/ResumeProfile";
import styled, { createGlobalStyle } from "styled-components";
import { Button, Form, FormControl } from "react-bootstrap";

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
  width: 300px;
  height: 40px;
  margin: 0 auto;
  margin-top: 30px;
  padding-right: 20px;
  padding-left: 20px;
`;
const handleSearch = () => {};

function Home() {
  var isLogin = false;
  if (localStorage.getItem("ProfileURL")) {
    isLogin = true;
  }

  return (
    <div>
      <h1>Check Git Out!</h1>
      <SearchBlock>
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
      </SearchBlock>

      <br />
      <div>
        {isLogin ? (
          <logouttag>
            <TemplateBlock>
              <ResumeProfile />
            </TemplateBlock>
          </logouttag>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Home;
