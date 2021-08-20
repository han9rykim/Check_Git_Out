import React from "react";
import styled from "styled-components";

const TodoTemplateBlock = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 24px;
  width: 148px;
  height: 54px;
  background: #3b855b;
  border-radius: 8px;
`;

const Insert = () => {
  return (
    <form className="TodoInsert">
      <input placeholder="할 일을 입력하세요" />
      <TodoTemplateBlock type="submit">버튼</TodoTemplateBlock>
    </form>
  );
};

export default Insert;
