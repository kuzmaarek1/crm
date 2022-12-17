import styled, { css } from "styled-components";
export const Button = styled.button`
  position: relative;
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "7vh")};
  border: none;
  background: ${(props) =>
    props.red ? "#fcd0cf" : "rgba(197, 220, 250, 0.5)"};
  color: ${(props) => (props.red ? "#a90e46" : "#0f56b3")};
  font-family: "Mulish", sans-serif;
  border-radius: 100px !important;
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  font-size: 1em;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition-property: all;
  transition-timing-function: ease-in;
  transition-duration: 500ms;
  border: ${(props) => (props.red ? "1px solid #a90e46" : "1px solid#0f56b3")};
  ${(props) =>
    props.team &&
    css`
      background: ${(props) =>
        props.red ? "#fcd0cf" : "rgba(197, 220, 250, 0.7)"};
      border: ${(props) =>
        props.red ? "1px solid #a90e46" : "1px solid#0f56b3"};
      font-size: 0.9em;
    `}
  &:before, &:after {
    content: "";
    position: absolute;
    width: ${(props) => (props.team ? "15px" : "25px")};
    height: ${(props) => (props.team ? "8px" : "15px")};
    border-radius: 15px;
    inset: 0;
    top: ${(props) => (props.team ? "-4px" : "-7px")};
    left: ${(props) =>
      props.team ? "calc(20% - 10px)" : "calc(20% - 12.5px)"};
    background-color: ${(props) =>
      props.red ? "#fcd0cf" : "rgba(197, 220, 250, 1)"};
    border: ${(props) =>
      props.red ? "1.5px solid #a90e46" : "1.5px solid#0f56b3"};
    transition-timing-function: ease-in;
    transition-duration: 500ms;
    pointer-events: none;
  }
  &:after {
    top: ${(props) => (props.team ? "calc(100% - 4px)" : "calc(100% - 7px)")};
    left: ${(props) =>
      props.team ? "calc(80% - 10px)" : "calc(80% - 12.5px)"};
  }

  &:hover {
    letter-spacing: 0.2em;
    background-color: ${(props) =>
      props.red ? "#fcd0cf" : "rgba(197, 220, 250, 1)"};
    box-shadow: ${(props) =>
      props.red ? "0 0 15px #a90e46" : "0 0 15px#0f56b3"};
    &:before {
      left: ${(props) =>
        props.team ? "calc(80% - 10px)" : "calc(80% - 12.5px)"};
    }
    &:after {
      left: ${(props) =>
        props.team ? "calc(20% - 10px)" : "calc(20% - 12.5px)"};
    }
  }
`;
