import React from "react";
import { Route } from "react-router-dom";
import Home from "./home/Home";
import About from "./about/About";
import Setting from "./setting/Setting";
import Profiles from "./profile/Profiles";
import Login from "./login/Login";
import Resume from "./resume/Resume";
import Callback from "./oAuthPrac/Callback";
import Username from "./login/Username";
import Mypage from "./mypage/Mypage";
import Errorpage from "./error/Errorpage";
function RouteHome() {
  return (
    <div>
      <Route path="/" component={Home} exact={true} />
      <Route path="/about" component={About} />
      <Route path="/setting" component={Setting} />
      <Route path="/profiles" component={Profiles} />
      <Route path="/login" component={Login} />
      <Route path="/callback" component={Callback} />
      <Route path="/login/username" component={Username} />
      <Route path="/mypage" component={Mypage} />
      <Route path="/error" component={Errorpage} />
      <Route path="/resume" component={Resume} exact={true} />
      <Route path="/resume/:username" component={Resume} />
    </div>
  );
}

// 화면 전환을 위해 있는 RouteHome 컴포넌트

export default RouteHome;
