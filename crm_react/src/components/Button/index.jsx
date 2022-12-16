import styled, { css } from "styled-components";
export const Button = styled.button`
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "7vh")};
  border: none;
  background: ${(props) =>
    props.red ? "#fcd0cf" : "rgba(197, 220, 250, 0.5)"};
  color: ${(props) => (props.red ? "#a90e46" : "#0f56b3")};
  font-family: "Mulish", sans-serif;
  border-radius: 100px !important;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  font-size: 1em;
  text-align: center;
  ${(props) =>
    props.team &&
    css`
      background: ${(props) =>
        props.red ? "#fcd0cf" : "rgba(197, 220, 250, 0.7)"};
      border: ${(props) =>
        props.red ? "1px solid #a90e46" : "1px solid#0f56b3"};
      width: 20%;
      height: 4vh;
      line-height: 4vh;
      font-size: 0.9em;
    `}
`;
