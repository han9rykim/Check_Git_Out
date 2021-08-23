import React, { useState } from "react";
import { Octokit } from "@octokit/rest";
import styled from "styled-components";
import marked from "marked";

function encode_utf8(s) {
  return unescape(encodeURIComponent(s));
}

function decode_utf8(s) {
  return decodeURIComponent(escape(s));
}

async function getProfileObj() {
  // const response = JSON.parse(localStorage.getItem("response"));
  const token = localStorage.getItem("access_token");
  const octokit = new Octokit({
    auth: String(token),
  });

  const user = localStorage.getItem("username");

  const tmProfile = await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      owner: user,
      repo: `${user}`,
      path: "README.md",
    }
  );

  return decode_utf8(atob(tmProfile.data.content));
}

function ResumeProfile(props) {
  const [content, setContent] = useState("");
  const promise = getProfileObj();
  promise.then((value) => {
    setContent(value);
  });

  const renderer = new marked.Renderer();
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
      <div
        id="preview"
        dangerouslySetInnerHTML={{ __html: marked(con, { render: renderer }) }}
        // dangerouslySetInnerHTML={createMarkUp(con)}
      />
    </div>
  );
}

export default ResumeProfile;
