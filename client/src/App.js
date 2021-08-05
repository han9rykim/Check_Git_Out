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
  
  h1{
        margin: 0;
        font-size: 36px;
        color: #343a40;
    }
	
`;
function App(){
	return (
		<div>
			<GlobalStyle />
			
			<Banner />
			<RouteHome/>
		</div>
	);
}

export default App;