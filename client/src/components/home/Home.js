import React from "react";
import ResumeProfile from "../resume/ResumeProfile";
import styled from "styled-components";
import { Button, Form, FormControl, Nav } from "react-bootstrap";
import { Link, Route } from "react-router-dom";
import marked from "marked";

const ContentBlock = styled.div`
  position: relative;
  font-size: 1.2em;
  text-align: left;
  color: white;
  width: 870px;
  top: 60px;
  background: rgba(22, 65, 148, 0.8);
  height: 470px;
  border-radius: 30px;
  margin: 0 auto;

  padding-right: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 30px;
`;

const Block = styled.div`
  position: relative;
  top: 100px;
  border-radius: 10px;
`;

function Home() {
  const renderer = new marked.Renderer();
  const content = `# Check Git Out! 
## Github를 활용한 학생이력관리시스템 
본 시스템은 보다 신뢰성 높은 방식으로 학생의 활동을 인증하기 위해 만들어진 시스템입니다.<br/>
Git의 Commit과 Pull Request, Merge를 활용한 방식으로 학생의 이력서를 누가 인증해주었는지 보다 투명하게 보여줍니다.

### 사용방법
1. Repository를 생성합니다. Repository의 이름은 {username}Resume입니다.<br/>정해진 형식을 지키지 않을 경우 이력서가 관리되지 않을 수 있습니다. 
2. 생성된 Repository의 최상단 디렉토리에 Readme.md파일을 생성하고, 본인이 작성하고 싶은 이력이 있을 경우 작성하셔도 됩니다.
3. 관리자의 이메일hyunsoo99kim@gmail.com로 <br/>[CheckGitOut 인증 요청] 을 제목으로 하여 연락을 주시기 바랍니다. (인증은 최대 1일 소요될 수 있습니다.)
`;
  const con = marked(content, {
    pedantic: true,
    gfm: true,
    breaks: true,
    sanitize: false,
    smartLists: true,
    smartypants: true,
    xhtml: true,
  });
  return (
    <div>
      <Block>
        <img src="img/GithubLogo.png" />
        <br />
        <img src="img/logo_CNU.png" />
        <ContentBlock
          id="preview"
          dangerouslySetInnerHTML={{
            __html: marked(con, { render: renderer }),
          }}
        />
      </Block>
    </div>
  );
}

export default Home;
