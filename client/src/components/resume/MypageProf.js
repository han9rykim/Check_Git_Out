import React, { useState, useEffect } from "react";
import { Octokit } from "@octokit/rest";
import styled from "styled-components";
import marked from "marked";

const Title = styled.div`
  font-size: 1.2em;
  text-align: left;
  color: black;
`;

function encode_utf8(s) {
  // string -> base64 encoding
  return unescape(encodeURIComponent(s));
}

function decode_utf8(s) {
  //base64 -> utf8
  return decodeURIComponent(escape(s));
}

async function getProfileObj(props) {
  const token = localStorage.getItem("access_token");
  const octokit = new Octokit({
    auth: String(token),
  });

  // const user = localStorage.getItem("username");
  const user = props;
  var haveRepo = true;
  var returnContent = "";
  const userReadme = await octokit
    .request("GET /repos/{owner}/{repo}/contents/{path}", {
      owner: `${user}`,
      repo: `${user}Resume`,
      path: "README.md",
    })
    .catch((errorMessage, statusCode) => {
      // This is never hit for a server 404 error
      haveRepo = false;
      returnContent = "<center> This Student Doesn't Have Resume </center>";
      // console.log(errorMessage, statusCode);
    });
  if (haveRepo) {
    returnContent = decode_utf8(atob(userReadme.data.content));
  }
  return returnContent;
}

function MypageProf(props) {
  const [content, setContent] = useState("");
  const promise = getProfileObj(props.props);
  // console.log(promise);
  promise.then((value) => {
    setContent(value);
  });

  const renderer = new marked.Renderer();
  const con = marked(content, {
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
      <Title
        id="preview"
        dangerouslySetInnerHTML={{ __html: marked(con, { render: renderer }) }}
      />
    </div>
  );
}

export default MypageProf;
