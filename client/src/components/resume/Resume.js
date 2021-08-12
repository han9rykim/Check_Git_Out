import React from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Content = styled.div`
	width: 512px;
	height: 768px;
	position: relative;
	background: white;
	border-radius: 16px;
	box-shadow: 0 0 8px rgba(0, 0, 0, 0.04);
	margin: 0 auto;
	margin-top: 50px;
	margin-bottom: 32px;
	display: flex;
	flex-direction: column;
`;

function Resume() {
	return (
		<div>
			<h1>이력서 페이지</h1>

			<Container fluid="md">
				<Row>
					<Col>
						<Content>
							<h1>ReadmeContent</h1>
						</Content>
					</Col>
					<Col>
						<Content>
							<FloatingLabel
								controlId="floatingTextarea"
								label="Title"
								className="mb-3"
							>
								<Form.Control
									as="textarea"
									placeholder="Leave a comment here"
								/>
							</FloatingLabel>
							<FloatingLabel controlId="floatingTextarea2" label="description">
								<Form.Control
									as="textarea"
									placeholder="Leave a comment here"
									style={{ height: "100px" }}
								/>
							</FloatingLabel>
							<Container fluid="md">
								<Row>
									<Col>
										<Button as="input" type="button" value="Save" />{" "}
									</Col>
									<Col>
										<Button as="input" type="submit" value="Pull Request" />{" "}
									</Col>
								</Row>
							</Container>
						</Content>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default Resume;
