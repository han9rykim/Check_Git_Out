import React from "react";
import styled from "styled-components";
import ResumeProfile from "../resume/ResumeProfile";

const TemplateBlock = styled.div`
  width: 920px;
  height: 1400px;

  position: relative;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.04);
  margin: 0 auto;
  margin-top: 96px;
  margin-bottom: 32px;
  padding-top: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
`;

function Mypage() {
  return (
    <div>
      <TemplateBlock>
        <ResumeProfile />
      </TemplateBlock>
    </div>
  );
}

export default Mypage;
