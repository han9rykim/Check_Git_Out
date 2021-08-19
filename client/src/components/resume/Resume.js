import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Button, Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
const Content = styled.div`
  width: 100%;
  height: 170%;
  position: relative;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.04);
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
`;

function Resume() {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sendReq, setSendReq] = useState("");

  //갹채를 업데이트하기위해 useState안에 객체를 사용
  const [inputs, setInputs] = useState({
    name: "",
    nickname: "",
  });
  //값을 가져오기 위해 inputs에 name으로 가져왔다
  const { name, nickname } = inputs;

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
      nickname: "",
    };
    //초기화 객체값을 넣은 변수로 변경하도록 셋인풋 실행
    setInputs(resetInputs);
  };
  function saveToDB(e) {
    // e.preventDefault();

    setSendReq(`${nickname} - ${name}`);
    console.log(sendReq);
    // if (sendReq != null) {
    // 	console.log(sendReq);
    // }
  }
  const handleLogOut = () => {};

  return (
    <div>
      <h1>이력서 페이지</h1>

      <Container fluid="md">
        <Row>
          <Col>
            <Content>
              <p>ReadmeContent</p>
            </Content>
          </Col>
          <Col>
            <Content>
              <FloatingLabel
                controlId="floatingTextarea"
                label="Title"
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  name="nickname"
                  onChange={onChange}
                  value={nickname}
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
                    <Button
                      as="input"
                      type="submit"
                      value="Commit to Forked Repo"
                    />
                  </Col>
                  <Col>
                    <Button
                      as="input"
                      type="submit"
                      value="Create Pull Request"
                      onClick={() =>
                        axios.post(`http://168.188.129.200:3001/pullrequest`, {
                          sendReq,
                        })
                      }
                    />
                  </Col>
                </Row>
                <button onClick={onReset}>초기화</button>
                <div>
                  최종 내용: [{nickname}-{name}]
                </div>
              </Container>
            </Content>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Resume;
