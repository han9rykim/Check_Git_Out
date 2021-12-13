import styled from "styled-components";
import ResumeProfile from "../resume/ResumeProfile";
import axios from "axios";
import React, { useState } from "react";
import marked from "marked";
import MypageProf from "../resume/MypageProf";
import "./Mypage.css";
import Spinner from "react-bootstrap/Spinner";

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
    console.log("불림");
    const stuname = props;
    var response;
    try {
      response = await axios.post(`http://168.188.129.200:8080/checkpr`, {
        stuname,
      });
    } catch (err) {}
    return response;
  }

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

  function sendNeededCommit(e) {
    e.preventDefault();
    console.log("눌림");
  }

  async function sendNeededCommit2(props) {
    // props.preventDefault();
    // alert(props);
    const writer = props["writer"];
    const content = props["content"];
    console.log(writer + " " + content);
    const headers = {
      stuname: username,
      admin: writer,
      content: content,
    };
    console.log("전송 시작");
    await axios.post(`http://168.188.129.200:8080/makecommit`, {
      headers,
    });
    console.log("전송 완료");
    console.log("pr router");
    let tmp_Status;
    // document.getElementById("loading").style.display = "block";
    setTimeout(
      async () =>
        await axios
          .post(`http://168.188.129.200:8080/pullrequest`, {
            stuname: username,
            prof: writer,
          })
          .then(function (response) {
            if (response.status == 200) {
              setTimeout(
                async () =>
                  await axios
                    .post(`http://168.188.129.200:8080/merge`, {
                      stuname: username,
                    })
                    .then(function (response) {
                      if (response.status == 200) {
                        alert("추가되었습니다.");
                        GetMyNewCommit();
                      }
                    }),
                3000
              );
            }
          }),
      3000
    );
    // document.getElementById("loading").style.display = "none";

    console.log("pr router end");
    console.log("delete start");
    const header = {
      stuname: username,
      prof: writer,
      content: content,
    };
    await axios.post(`http://168.188.129.200:8080/deletecommit`, {
      header,
    });
    console.log("delete end");
  }

  async function GetMergeClick() {
    // const stuname = props;
    try {
      await axios.post(`http://168.188.129.200:8080/merge`, {
        stuname: username,
      });
    } catch (err) {}
    alert("확정되었습니다.");

    GetMyNewCommit();
  }

  // async function makeCommit(headers) {
  //   console.log("전송 시작");
  //   await axios.post(`http://168.188.129.200:8080/makecommit`, {
  //     headers,
  //   });
  //   console.log("전송 완료");
  // }

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
      while (commitBoard.firstChild) {
        commitBoard.removeChild(commitBoard.firstChild);
      }
      for (let i = 0; i < dataArr.length; i++) {
        let btn = document.createElement("button");
        btn.className = "AddBtn";
        btn.innerHTML = "추가하기";
        let div = document.createElement("div");
        div.className = "CommitLog";
        let tmp = document.createElement("p");
        tmp.innerHTML = JSON.stringify(dataArr[i]);
        div.append(tmp);
        div.append(btn);
        btn.addEventListener(
          "click",
          // sendNeededCommit((e) => sendNeededCommit2(dataArr[i]))
          (e) => {
            sendNeededCommit2(dataArr[i]);
          }
        );
        commitBoard.appendChild(div);
      }
    } catch {}

    return response.data;
  }
  GetMyNewCommit();

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
        <div id="previewCommitLog"></div>
      </div>
    </div>
  );
}

export default Mypage;
