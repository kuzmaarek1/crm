import styled, { css } from "styled-components";
import { BiSearch } from "react-icons/bi";

export const Wrapper = styled.div`
  height: 92.5vh;
  overflow-y: auto;
  overflow-x: none;
  color: #303030;
  background-color: #f7f8fc;
`;

export const Title = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
  align-items: center;
  height: 10vh;
  width: 100%;
`;
export const Header = styled.h1`
  margin-left: 2vw;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #737c8e;
  color: #616161;
  background-color: rgba(112, 112, 112, 0.1);
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  border-radius: 25px;
  transition-property: all;
  transition-timing-function: ease-in;
  transition-duration: 200ms;
  &::placeholder {
    color: #616161;
    font-family: "Montserrat", sans-serif;
  }
  &:focus {
    border: 1px solid #0f56b3;
    background-color: rgba(197, 220, 250, 0.5);
    box-shadow: 0 0 6px#0f56b3;
    color: #0f56b3;
    outline: none;
    font-size: 1rem;
    &::placeholder {
      color: #0f56b3;
      font-family: "Montserrat", sans-serif;
    }
  }
`;

export const SearchIcon = styled(BiSearch)`
  position: absolute;
  right: 5px;
  cursor: pointer;
  transition-property: all;
  transition-timing-function: ease-in;
  transition-duration: 200ms;
  input:focus ~ && {
    background-color: transparent;
    color: #0f56b3;
    outline: none;
  }
`;

export const Label = styled.label`
  width: 90%;
  font-size: 10px;
  color: white;
  background-color: #616161;
  position: absolute;
  top: -7px;
  left: 0;
  right: 0;
  margin: auto;
  bottom: auto;
  border-radius: 10px;
  padding: 1px;
  letter-spacing: 0.05em;
  text-align: center;
  transition-property: all;
  transition-timing-function: ease-in;
  transition-duration: 200ms;
  input:focus ~ && {
    background-color: #0f56b3;
    color: white;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
`;
export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 100px;
  height: 50px;
  text-decoration: none;
  border: none;
  background: rgba(197, 220, 250, 0.5);
  color: #0f56b3;
  font-family: "Montserrat", sans-serif;
  border-radius: 100px !important;
`;

export const RowWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5vh;
  text-align: center;
  ${(props) =>
    props.title &&
    css`
      font-weight: 800;
    `}
  &:hover {
    cursor: ${(props) => (props.title ? "default" : "pointer")};
  }
`;

const backgroundRow = (props) => {
  let styles = "";
  if (!props.team) {
    for (let i = 6; i < 11; i++) {
      styles += `div:nth-child(10n+${i}) {
        background-color: #e0e0e0;
      }`;
    }
  } else {
    styles += `div:nth-child(2n) {
        background-color: #e0e0e0;
      }`;
    styles += `div>div:nth-child(2n) {
        background-color: transparent;
      }`;
  }
  return css`
    ${styles}
  `;
};

export const ListWrapper = styled.div`
  width: 100%;
  display: grid;
  background-color: #f7f8fc;
  grid-template-columns: ${(props) =>
    props.team ? "repeat(1, minmax(0, 1fr))" : "repeat(5, minmax(0, 1fr))"};
  ${(props) => backgroundRow(props)}
`;

export const GridWrapper = styled.div`
  display: flex;
  justify-content: ${(props) => (props.button ? "flex-end" : "center")};
  margin-right: ${(props) => (props.button ? "15px" : "0px")};
  align-items: center;
  ${(props) =>
    props.team &&
    css`
      width: 100%;
    `}
`;
