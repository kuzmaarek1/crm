import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  height: 92.5vh;
  overflow: scroll;
  color: #303030;
  background-color: #f7f8fc;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Title = styled.div`
  display: flex;
  flex-direction: row;
  height: 10vh;
`;
export const Header = styled.h1`
  width: 40%;
  margin-left: 2vw;
`;
export const ButtonWrapper = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 10vh;
`;
export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 8vw;
  height: 8vh;
  text-decoration: none;
  border: none;
  background: rgba(197, 220, 250, 0.5);
  color: #0f56b3;
  font-family: "Mulish", sans-serif;
  border-radius: 100px !important;
`;

export const RowWrapper = styled.div`
  display: flex;
  border-bottom: 2px solid #e0e0e0;
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
  width: 100vw;
  display: grid;
  background-color: #f7f8fc;
  grid-template-columns: ${(props) =>
    props.team ? "repeat(1, minmax(0, 1fr))" : "repeat(5, minmax(0, 1fr))"};
  border-top: 2px solid #e0e0e0;
  ${(props) => backgroundRow(props)}
`;

export const InputWrapper = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Input = styled.input`
  width: 120%;
  padding: 10px 12px;
  border: 1px solid #737c8e;
  box-sizing: border-box;
  color: #616161;
  box-shadow: -2px 4px 10px rgba(115, 124, 142, 0.09);
  font-size: 1rem;
  border-radius: 25px;
  resize: none;
  &:focus {
    outline: none;
    font-size: 1rem;
    color: #616161;
    box-shadow: -2px 4px 10px rgba(115, 124, 142, 0.3);
  }
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
