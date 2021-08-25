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

const CommitLogBlock = styled.div`
  position: absolute;
  width: 665px;
  height: 830px;
  left: 1085px;
  top: 80px;
  margin: 0 auto;
  background: rgba(197, 197, 197, 0.65);
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

const CommitLogTitle = styled.div`
  position: absolute;
  width: 606px;
  height: 55px;
  left: 1115px;
  top: 105px;
  background: rgba(22, 65, 148, 0.8);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 40px;
  line-height: 60px;
  color: #ffffff;
`;

const CommitLog = styled.div`
  position: absolute;
  width: 606px;
  height: 680px;
  left: 1115px;
  top: 180px;
  background: rgba(22, 65, 148, 0.8);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

const MergeBtn = styled.button`
  position: absolute;
  width: 100px;
  height: 30px;
  left: 1360px;
  top: 870px;
  background: rgba(22, 65, 148, 0.8);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
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
      <CommitLogBlock />
      <CommitLogTitle>Commit Log</CommitLogTitle>
      <CommitLog />
      <MergeBtn>확인</MergeBtn>
    </div>
  );
}

export default Mypage;
