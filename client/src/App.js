import React from "react";
import { createGlobalStyle } from "styled-components";
import RouteHome from "./components/RouteHome";
import Banner from "./components/home/Banner";
import "bootstrap/dist/css/bootstrap.min.css";

const GlobalStyle = createGlobalStyle`
  body{
    background: #e9ecef;
	text-align: center;
  }

	
`;
function App() {
	return (
		<div>
			<GlobalStyle />
			<Banner />
			<RouteHome />
		</div>
	);
}

export default App;
