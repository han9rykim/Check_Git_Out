import React from "react";
import styled from "styled-components";
import ResumeProfile from "../resume/ResumeProfile";

const ReadmeBackGroundBlock = styled.div`
  position: absolute;
  overflow: scroll;
  width: 870px;
  height: 830px;
  left: 100px;
  top: 80px;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 10px;
  margin: 0 auto;
  padding-right: 30px;
  padding-left: 30px;
  margin-bottom: 32px;
`;

function Mypage() {
  var username = "";
  if (localStorage.getItem("username")) {
    username = localStorage.getItem("username");
  }
  return (
    <div>
      <ReadmeBackGroundBlock>
        <ResumeProfile props={username} />
      </ReadmeBackGroundBlock>
    </div>
  );
}

export default Mypage;
