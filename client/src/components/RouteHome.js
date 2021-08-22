import React from "react";
import { Route } from "react-router-dom";
import Home from "./home/Home";
import About from "./about/About";
import Setting from "./setting/Setting";
import Profiles from "./profile/Profiles";

import Ranking from "./rank/Ranking";
import Login from "./login/Login";
import Resume from "./resume/Resume";
import GroupRanking from "./rank/GroupRanking";
import RankHome from "./rank/RankHome";
import Callback from "./oAuthPrac/Callback";
import Username from "./login/Username";
import Mypage from "./mypage/Mypage";

import Errorpage from "./error/Errorpage";

function RouteHome() {
  return (
    <div>
      <Route path="/" component={Home} exact />
      <Route path="/about" component={About} />
      <Route path="/setting" component={Setting} />
      <Route path="/profiles" component={Profiles} />
      <Route path="/Ranking" component={Ranking} />
      <Route path="/login" component={Login} />
      <Route path="/rank" component={RankHome} />
      <Route path="/groupranking" component={GroupRanking} />
      <Route path="/callback" component={Callback} />
      <Route path="/login/username" component={Username} />
      <Route path="/mypage" component={Mypage} />
      <Route path="/error" component={Errorpage} />
      <Route path="/resume/:username" component={Resume} />
    </div>
  );
}

export default RouteHome;
