import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import ResumeProfile from "./ResumeProfile";

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
  height: 390px;
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
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 35px;
  color: #ffffff;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
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
  height: 200px;
  left: 1115px;
  top: 640px;
  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: block;
  color: #8d8d8d;
  background: #ffffff;
`;

const CheckBlock = styled.button`
  position: absolute;
  width: 100px;
  height: 30px;
  left: 1360px;
  top: 850px;
  color: white;
  background: rgba(22, 65, 148, 0.8);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;
const GetBlock = styled.button`
  position: absolute;
  width: 100px;
  height: 30px;
  left: 1210px;
  top: 430px;

  background: rgba(22, 65, 148, 0.8);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  color: white;
`;

const CommitBtnBlock = styled.button`
  position: absolute;
  width: 100px;
  height: 30px;
  left: 1320px;
  top: 430px;

  background: rgba(22, 65, 148, 0.8);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  color: white;
`;
const DeleteBtnBlock = styled.button`
  position: absolute;
  width: 100px;
  height: 30px;
  left: 1430px;
  top: 430px;
  background: rgba(22, 65, 148, 0.8);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  color: white;
`;

const DeleteAllBlock = styled.button`
  position: absolute;
  width: 100px;
  height: 30px;
  left: 1375px;
  top: 375px;
  background: rgba(22, 65, 148, 0.8);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  background: #ffffff;
`;

const MakePRBlock = styled.button`
  position: absolute;
  width: 100px;
  height: 30px;
  left: 1540px;
  top: 430px;
  background: rgba(22, 65, 148, 0.8);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  color: white;
`;

function Resume({ history, match }) {
  const token = localStorage.getItem("access_token");
  const { username } = match.params;

  const [commitContent, setcommitContent] = useState("");

  const adminUser = localStorage.getItem("username");
  const [sendReq, setSendReq] = useState({
    date: "",
    title: "",
    description: "",
    admin: "",
    student: "",
    token: token,
  });

  const { date, title, description, admin } = sendReq;
  const onChange = (e) => {
    e.preventDefault();
    const nextsendReq = {
      ...sendReq, // 기존의 sendReq 내용 복사
      [e.target.name]: e.target.value,
      admin: adminUser,
      student: username,
    };
    setSendReq(nextsendReq);
  };

  const addCommitLog = () => {
    // e.preventDefault();
    console.log("확이버튼");
    alert(`[${date}] [${title}] - ${description}`);
    setSendReq({
      date: "",
      title: "",
      description: "",
      token: token,
    });
    axios.post(`http://168.188.129.200:8080/addcommitlog`, {
      sendReq,
    });
  };

  async function getProfileObj(props) {
    var response;
    try {
      const username = props;
      response = await axios.post(`http://168.188.129.200:8080/getcommitlog`, {
        username, //학생이름.
      });
    } catch (err) {}

    return response;
  }

  const GetClick = (e) => {
    axios
      .post(`http://168.188.129.200:8080/getcommitlog`, {
        username, //학생이름.
      })
      .then((response) => {
        setcommitContent(response.data);
      });
  };

  async function MakeCommit(props) {
    const headers = {
      stuname: props,
      admin: localStorage.getItem("username"),
    };
    console.log("전송 시작");
    await axios.post(`http://168.188.129.200:8080/makecommit`, {
      headers,
    });
    console.log("전송 완료");
  }
  async function DeleteCommit(props) {
    const headers = {
      stuname: props,
      prof: adminUser,
    };
    await axios.post(`http://168.188.129.200:8080/deletecommit`, {
      headers,
    });
  }

  async function DeleteAll(props) {
    const headers = {
      stuname: props,
      prof: adminUser,
    };
    await axios.post(`http://168.188.129.200:8080/deleteall`, {
      headers,
    });
  }

  async function MakePR(props) {
    const stuname = props;
    const prof = localStorage.getItem("username");
    await axios.post(`http://168.188.129.200:8080/pullrequest`, {
      stuname,
      prof,
    });
  }

  // const onKeyPress = (e) => {
  //   if (e.key === "Enter") {
  //     onClick();
  //   }
  // };
  // const promise = getProfileObj(username);
  // promise.then((result) => {
  //   setcommitContent(result.data);
  // });

  return (
    <div>
      <ReadmeBackGroundBlock>
        <ResumeProfile props={username} />
      </ReadmeBackGroundBlock>
      <CommitLogBlock />
      <CommitLogTitle>Commit Log</CommitLogTitle>
      <CommitLog>{commitContent}</CommitLog>

      <CommitBlock />
      <DateBlock
        type="text"
        name="date"
        placeholder="date"
        value={date}
        onChange={onChange}
      />

      <TitleBlock
        type="text"
        name="title"
        placeholder="title"
        value={title}
        onChange={onChange}
      />

      <DescriptionBlock
        type="text"
        name="description"
        placeholder="description"
        value={description}
        onChange={onChange}
        // onKeyPress={onKeyPress}
      />
      <div>
        <CheckBlock
          onClick={(e) => {
            e.preventDefault();
            addCommitLog();
          }}
        >
          확인
        </CheckBlock>

        <GetBlock
          // onClick={(e) => {
          //   e.preventDefault();
          //   GetClick();
          // }}
          onClick={GetClick}
        >
          새로고침
        </GetBlock>

        <CommitBtnBlock
          onClick={(e) => {
            e.preventDefault();
            MakeCommit(username);
          }}
          // onClick={MakeCommit(username)}
        >
          Commit
        </CommitBtnBlock>
        <DeleteBtnBlock
          onClick={(e) => {
            e.preventDefault();
            DeleteCommit(username);
          }}
        >
          Delete Log
        </DeleteBtnBlock>

        <MakePRBlock
          onClick={(e) => {
            e.preventDefault();
            MakePR(username);
          }}
        >
          Make PR
        </MakePRBlock>

        <DeleteAllBlock
          onClick={(e) => {
            e.preventDefault();
            DeleteAll(username);
          }}
        >
          Delete ALL
        </DeleteAllBlock>
      </div>
    </div>
  );
}

export default Resume;
