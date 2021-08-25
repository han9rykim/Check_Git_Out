import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Button, Form, FormControl } from "react-bootstrap";
import axios from "axios";
const SearchBlock = styled.div`
  position: relative;
  width: 920px;
  height: 40px;
  margin: 0 auto;
  margin-top: 30px;
  padding-right: 20px;
  padding-left: 20px;
`;

function ResumeSearch({ history }) {
  const [searchUser, setSearchUser] = useState("");

  const handleChange = ({ target: { value } }) => setSearchUser(value);

  return (
    <div>
      <h1>Search Your Student</h1>
      {/* <form action="/" method="get">
       */}
      <form width="1000px">
        <input
          type="text"
          id="header-search"
          placeholder="Search student name here"
          name="resume"
          value={searchUser}
          onChange={handleChange}
        />
        <button onClick={() => history.push(`/resume/${searchUser}`)}>
          버튼
        </button>
      </form>
      <hr />
    </div>
  );
}

export default ResumeSearch;
