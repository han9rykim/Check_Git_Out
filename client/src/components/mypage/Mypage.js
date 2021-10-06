import styled from "styled-components";
import ResumeProfile from "../resume/ResumeProfile";
import axios from "axios";
import React, { useState } from "react";
import marked from "marked";
import MypageProf from "../resume/MypageProf";

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
  ont-family: Roboto;
  font-style: normal;
  font-weight: normal;
  overflow: scroll;
  font-size: 20px;
  line-height: 35px;
  color: #ffffff;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 606px;
  height: 680px;
  left: 1115px;
  top: 180px;
  background: rgba(22, 65, 148, 0.8);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

const CheckPRBtn = styled.button`
  position: absolute;
  width: 100px;
  height: 30px;
  left: 1300px;
  top: 870px;
  background: rgba(22, 65, 148, 0.8);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;
const MergeBtn = styled.button`
  position: absolute;
  width: 100px;
  height: 30px;
  left: 1420px;
  top: 870px;
  background: rgba(22, 65, 148, 0.8);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

function Mypage() {
  async function getProfileObj() {
    var response;
    try {
      const username = localStorage.getItem("username");
      response = await axios.post(`http://168.188.129.200:8080/getcommitlog`, {
        username, //학생이름.
      });
    } catch (err) {}

    return response;
  }

  async function checkPR(props) {
    const stuname = props;
    var response;
    try {
      response = await axios.post(`http://168.188.129.200:8080/checkpr`, {
        stuname,
      });
    } catch (err) {}
    return response;
  }

  const GetClick = (props) => {
    const promise = checkPR(props);
    console.log(promise);
    promise.then((result) => {
      if (result.data.changedContent == null) {
        setcommitContent("Pull Request가 없습니다.");
      } else {
        setcommitContent(result.data.changedContent);
      }
    });
  };

  async function GetMergeClick(props) {
    const stuname = props;
    try {
      await axios.post(`http://168.188.129.200:8080/merge`, {
        stuname,
      });
    } catch (err) {}
  }

  const [commitContent, setcommitContent] = useState("");
  var username = "";
  if (localStorage.getItem("username")) {
    username = localStorage.getItem("username");
  }

  const renderer = new marked.Renderer();
  const con = marked(commitContent, {
    pedantic: false,
    gfm: true,
    breaks: true,
    sanitize: false,
    smartLists: false,
    smartypants: true,
    xhtml: true,
  });

  return (
    <div>
      <ReadmeBackGroundBlock>
        <MypageProf props={username} />
      </ReadmeBackGroundBlock>
      <CommitLogBlock />
      <CommitLogTitle>Commit Log</CommitLogTitle>
      <CommitLog
        id="preview"
        dangerouslySetInnerHTML={{ __html: marked(con, { render: renderer }) }}
      />
      <CheckPRBtn onClick={() => GetClick(username)}>PR확인하기</CheckPRBtn>
      <MergeBtn onClick={() => GetMergeClick(username)}>Merge하기</MergeBtn>
    </div>
  );
}

export default Mypage;
