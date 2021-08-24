import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  FormControl,
  FloatingLabel,
} from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import ResumeProfile from "./ResumeProfile";
import { Octokit } from "@octokit/rest";
import qs from "qs";
import Username from "../login/Username";

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

const CommitBlock = styled.div`
  position: absolute;
  width: 665px;
  height: 410px;
  left: 1085px;
  top: 500px;
  background: rgba(197, 197, 197, 0.65);
  border-radius: 10px;
`;

const CommitLogBlock = styled.div`
  position: absolute;
  width: 665px;
  height: 360px;
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
  height: 240px;
  left: 1115px;
  top: 180px;
  background: rgba(22, 65, 148, 0.8);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

const TitleBlock = styled.input`
  position: absolute;
  width: 605px;
  height: 50px;
  left: 1115px;
  top: 580px;
  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: block;
  color: #8d8d8d;
  background: #ffffff;
`;

const DateBlock = styled.input`
  position: absolute;
  width: 605px;
  height: 55px;
  left: 1115px;
  top: 510px;
  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: block;
  color: #8d8d8d;
  background: #ffffff;
`;

const DescriptionBlock = styled.input`
  position: absolute;
  width: 605px;
  height: 150px;
  left: 1115px;
  top: 640px;
  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: block;
  color: #8d8d8d;
  background: #ffffff;
`;

const MergeBtnBlock = styled.div`
  position: absolute;
  width: 100px;
  height: 30px;
  left: 1326px;
  top: 850px;

  background: rgba(22, 65, 148, 0.8);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

async function getStuInfo() {
  const stuInfo = await axios.post(`http://168.188.129.200:8080/studentinfo`);
  return stuInfo;
}

function Resume({ history, match }) {
  const { username } = match.params;

  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sendReq, setSendReq] = useState("");
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeDescription = (e) => setDescription(e.target.value);
  const onChangeDate = (e) => setDate(e.target.value);

  useEffect(() => {
    setSendReq(`[${date}] [${title}] - ${description} `);
  }, [date, title, description]);

  // const data = {
  //   dblepart99: { name: "김현수" },
  //   binaryKim99: { name: "김현수" },
  //   HwangDongJun: { name: "황동준" },
  // };
  // const profile = data[username];
  // console.log(profile);
  // /*
  // 쿼리문 날려서 실제로 있는 학생인지 찾기.
  // 조건 처리 필요.
  // */

  // if (!profile) {
  //   console.log("???");
  //   return (
  //     <div>
  //       존재하지 않는 사용자입니다.
  //       <button onClick={() => history.goBack()}>뒤로 가기</button>
  //     </div>
  //   );
  // }

  const onClick = () => {
    alert(`[${date}] [${title}] - ${description} `);

    setTitle("");
    setDescription("");
    setDate("");
    axios.post(`http://168.188.129.200:8080/pullrequest`, {
      sendReq,
    });
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onClick();
    }
  };
  const onKeyPressDate = (e) => {
    if (e.key === "Enter") {
      alert("description을 입력해주세요.");
    }
  };
  const onKeyPressTitle = (e) => {
    if (e.key === "Enter") {
      alert("빈칸이 남아있습니다.");
    }
  };

  return (
    <div>
      <ReadmeBackGroundBlock>
        <ResumeProfile props={username} />
      </ReadmeBackGroundBlock>
      <CommitLogBlock />
      <CommitLogTitle>Commit Log</CommitLogTitle>
      <CommitLog />

      <CommitBlock />
      <DateBlock
        type="text"
        name="date"
        placeholder="date"
        value={date}
        onChange={onChangeDate}
        onKeyPress={onKeyPressDate}
      />

      <TitleBlock
        type="text"
        name="title"
        placeholder="title"
        value={title}
        onChange={onChangeTitle}
        onKeyPress={onKeyPressTitle}
      />

      <DescriptionBlock
        type="text"
        name="description"
        placeholder="description"
        value={description}
        onChange={onChangeDescription}
        onKeyPress={onKeyPress}
      />
      <button onClick={onClick}>
        <MergeBtnBlock>확인</MergeBtnBlock>
      </button>
    </div>
  );
}

export default Resume;
