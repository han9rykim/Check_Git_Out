import React from "react";
import styled from "styled-components";
import ResumeProfile from "../resume/ResumeProfile";

const ReadmeBackGroundBlock = styled.div`
  position: absolute;
  width: 870px;
  min-height: 750px;
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
  return (
    <div>
      <ReadmeBackGroundBlock>
        <ResumeProfile />
      </ReadmeBackGroundBlock>
    </div>
  );
}

export default Mypage;
