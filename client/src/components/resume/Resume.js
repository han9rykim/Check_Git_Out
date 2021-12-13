import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import ResumeProfile from "./ResumeProfile";
import "./Resume.css";

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

  const addCommitLog = (e) => {
    // e.preventDefault();
    // console.log("확이버튼");
    if (date.length == 0 || title.length == 0 || title.description == 0) {
      alert("공백이 있습니다!");
      return;
    }
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

  return (
    <div className="outer">
      <div className="ReadmeBackGroundBlock">
        <div className="ReadmeUserNameBlock">{username}</div>
        <div className="ResumeBackGroundBlock">
          <ResumeProfile props={username} />
        </div>
      </div>
      {/* <CommitLogBlock /> */}
      {/* <CommitLogTitle>Commit Log</CommitLogTitle> */}
      {/* <CommitLog>{commitContent}</CommitLog> */}
      <div className="CommitBlock">
        <input
          className="DateBlock"
          type="text"
          name="date"
          placeholder="date"
          value={date}
          onChange={onChange}
          required={true}
        />
        <input
          className="TitleBlock"
          type="text"
          name="title"
          placeholder="title"
          value={title}
          onChange={onChange}
          required={true}
        />
        <input
          className="DescriptionBlock"
          type="text"
          name="description"
          placeholder="description"
          value={description}
          onChange={onChange}
          required={true}
          // onKeyPress={onKeyPress}
        />
        <div>
          <button
            className="CheckBlock"
            onClick={(e) => {
              e.preventDefault();
              addCommitLog();
            }}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

export default Resume;
