import styled, { css } from "styled-components";
export const Button = styled.button`
  width: 100%;
  height: 7vh;
  border: none;
  background: ${(props) =>
    props.red ? "#fcd0cf" : "rgba(197, 220, 250, 0.5)"};
  color: ${(props) => (props.red ? "#a90e46" : "#0f56b3")};
  font-family: "Mulish", sans-serif;
  border-radius: 100px !important;
  cursor: pointer;
  display: block;
  text-decoration: none;
  font-size: 1em;
  text-align: center;
  line-height: 7vh;
  ${(props) =>
    props.team &&
    css`
      margin-left: 40vw;
      width: 20%;
      height: 4vh;
      line-height: 4vh;
      font-size: 0.9em;
    `}
`;
