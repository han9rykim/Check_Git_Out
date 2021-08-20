import React from "react";
// import styled from "styled-components";

function Home() {
  var imgURL = "";
  if (localStorage.getItem("ProfileURL")) {
    imgURL = localStorage.getItem("ProfileURL");
  }

  return (
    <div>
      <h1>Check Git Out!</h1>
      <br />
      <h3>이 주 최고의 학교 : 충남대학교</h3>
      <h3>이 주 최고의 클랜 : DNlab</h3>
      <h3>이 주 가장 많이 성장한 클랜 : 4RGOS</h3>
      <h3>이 주 최고의 유저 : dblepart99</h3>
      <img src={imgURL} />
    </div>
  );
}

export default Home;
