import React from "react";
import styled from 'styled-components';

const TodoListBlock = styled.div`
    flex: 1;
    padding: 20px 32px;
    padding-bottom: 48px;
    overflow-y: auto;
    background: gray;

`;

function TodoList(){
    return (
			<TodoListBlock>
				TodoList
				<div>
					<button className="login">로그인</button>
				</div>
			</TodoListBlock>
		);
}


export default TodoList;