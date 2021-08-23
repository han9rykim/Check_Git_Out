import React, { useState, useEffect } from "react";
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

const Content = styled.div`
  width: 920px;
  height: auto;
  position: relative;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.04);

  top: 30px;
  bottom: 20px;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 100px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  flex-direction: column;
`;
const ReadmeStyle = styled.div`
  width: 920px;
  height: auto;
  position: relative;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.04);
  align-items: center;
  top: 30px;
  bottom: 20px;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 100px;
  margin-right: auto;
  margin-left: auto;
  padding-top: 10px;
  padding-right: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
`;

// const response = axios.post(`http://168.188.129.200:8080/studentinfo`);
// console.log(response);
// const data = {}

async function getStuInfo() {
  const stuInfo = await axios.post(`http://168.188.129.200:8080/studentinfo`);
  return stuInfo;
}

function Resume({ history, match }) {
  const [sendReq, setSendReq] = useState("");
  //갹채를 업데이트하기위해 useState안에 객체를 사용
  const [inputs, setInputs] = useState({
    name: "",
    title: "",
  });
  // const [data, setData] = useState("");
  const data = {
    dblepart99: { name: "김현수" },
    binaryKim99: { name: "김현수" },
    HwangDongJun: { name: "황동준" },
  };

  // const promise = axios.post(`http://168.188.129.200:8080/studentinfo`);
  // promise.then((value) => {
  //   setData(value);
  // });
  // const prom = getStuInfo();
  // console.log(data);

  //값을 가져오기 위해 inputs에 name으로 가져왔다
  const { name, title } = inputs;

  useEffect(() => {
    setSendReq(`${title} - ${name}`);
    // console.log("입력했다.");
    // console.log(sendReq);
  }, [inputs]);

  // const query = qs.parse(location.search, {
  //   ignoreQueryPrefix: true,
  // });
  // console.log(query);

  const { username } = match.params;

  const profile = data[username];
  if (!profile) {
    return (
      <div>
        존재하지 않는 사용자입니다.
        <button onClick={() => history.goBack()}>뒤로 가기</button>
      </div>
    );
  }
  const onChange = (e) => {
    //input에 name을 가진 요소의 value에 이벤트를 걸었다
    const { name, value } = e.target;

    // 변수를 만들어 이벤트가 발생했을때의 value를 넣어줬다
    const nextInputs = {
      //스프레드 문법으로 기존의 객체를 복사한다.
      ...inputs,
      [name]: value,
    };
    //만든 변수를 seInput으로 변경해준다.
    setInputs(nextInputs);
  };

  const onReset = () => {
    const resetInputs = {
      name: "",
      title: "",
    };
    //초기화 객체값을 넣은 변수로 변경하도록 셋인풋 실행
    setInputs(resetInputs);
  };

  function saveToDB() {
    console.log(sendReq);
    sessionStorage.setItem("content", sendReq);
    axios.post(`http://168.188.129.200:8080/pullrequest`, {
      sendReq,
    });
  }

  function sendPR() {
    axios.post(`http://168.188.129.200:8080/pullrequest`, {
      sendReq,
    });
  }

  return (
    <div>
      <h1>이 력 서</h1>
      {/* <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="mr-2"
          aria-label="Search"
        />
        <Button variant="outline-success">Search</Button>
      </Form> */}
      <ReadmeStyle>
        <ResumeProfile props={username} />
      </ReadmeStyle>

      <Content>
        <FloatingLabel
          controlId="floatingTextarea"
          label="Title"
          className="mb-3"
        >
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            name="title"
            onChange={onChange}
            value={title}
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingTextarea2" label="description">
          <Form.Control
            type="password"
            as="textarea"
            style={{ height: "100px" }}
            name="name" //위에서 name의 값을 가져와 타겟을 가져온다.
            placeholder="description"
            onChange={onChange}
            value={name}
          />
        </FloatingLabel>

        <Container fluid="md">
          <Row>
            <Col>
              <Button
                as="input"
                type="submit"
                value="Save to DB"
                onClick={() => saveToDB()}
              />
            </Col>
            <Col>
              <Button as="input" type="submit" value="Commit to Forked Repo" />
            </Col>
            <Col>
              <Button as="input" type="submit" value="Create Pull Request" />
            </Col>
          </Row>
          <button onClick={onReset}>초기화</button>
          <div>
            최종 내용: [{title} - {name}]
          </div>
        </Container>
      </Content>
    </div>
  );
}

export default Resume;
