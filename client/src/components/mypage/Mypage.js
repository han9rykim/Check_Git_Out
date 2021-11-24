import styled from "styled-components";
import ResumeProfile from "../resume/ResumeProfile";
import axios from "axios";
import React, { useState } from "react";
import marked from "marked";
import MypageProf from "../resume/MypageProf";
import "./Mypage.css";

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

  // async function checkPR(props) {
  //   console.log("불림");
  //   const stuname = props;
  //   var response;
  //   try {
  //     response = await axios.post(`http://168.188.129.200:8080/checkpr`, {
  //       stuname,
  //     });
  //   } catch (err) {}
  //   return response;
  // }

  // const GetClick = (props) => {
  //   const promise = checkPR(props);
  //   console.log("siba");
  //   console.log(promise);
  //   promise.then((result) => {
  //     if (result.data.changedContent == null) {
  //       setcommitContent("Pull Request가 없습니다.");
  //     } else {
  //       setcommitContent(result.data.changedContent);
  //     }
  //   });
  // };

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

  async function GetMyNewCommit() {
    try {
      var response = await axios.post(
        `http://168.188.129.200:8080/getcommitlog`,
        {
          username, //학생이름.
        }
      );
      console.log(response.data);
      let commitBoard = document.getElementById("previewCommitLog");
      let dataArr = response.data.data;
      for (let i = 0; i < dataArr.length; i++) {
        let tmp = document.createElement("p");
        tmp.innerHTML = JSON.stringify(dataArr[i]);
        commitBoard.appendChild(tmp);
      }
    } catch {}

    return response.data;
  }

  return (
    <div className="outer">
      <div className="ReadmeBackGroundBlock">
        <div className="ReadmeUserNameBlock">{username}</div>
        <div className="ResumeBackGroundBlock">
          <MypageProf props={username} />
        </div>
      </div>

      <div className="CommitLogBlock">
        <div className="CommitLogTitle">Commit Log</div>
        <div
          className="CommitLog"
          id="previewCommitLog"
          dangerouslySetInnerHTML={{
            __html: marked(con, { render: renderer }),
          }}
        />
        <button className="CheckPRBtn" onClick={() => GetMyNewCommit()}>
          PR확인하기
        </button>
        <button className="MergeBtn" onClick={() => GetMergeClick(username)}>
          Merge하기
        </button>
      </div>
    </div>
  );
}

export default Mypage;
