import React from "react";
import ResumeProfile from "../resume/ResumeProfile";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

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

function Home() {
  var isLogin = false;
  if (localStorage.getItem("ProfileURL")) {
    isLogin = true;
  }

  return (
    <div>
      <h1>Check Git Out!</h1>
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
