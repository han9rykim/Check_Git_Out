import React from "react";
import { useLocation } from "react-router";
import { createGlobalStyle } from "styled-components";
import RouteHome from "./components/RouteHome";
import Banner from "./components/home/Banner";
import "bootstrap/dist/css/bootstrap.min.css";
import ResumeProfile from "./components/resume/ResumeProfile";

const GlobalStyle = createGlobalStyle`
  body{
    background: #e9ecef;
    text-align: center;
  }	
`;
function App() {
  // const location =
  useLocation();
  // console.log(location.state.tmpval);
  // var flag;
  // if (location.state) {
  //   flag = location.state.tmpval;
  // } else {
  //   flag = false;
  // }
  return (
    <div>
      <GlobalStyle />
      <Banner />
      <RouteHome />
      {/* <ResumeProfile /> */}
    </div>
  );
}

export default App;
