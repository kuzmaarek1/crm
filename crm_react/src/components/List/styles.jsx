import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  height: 92.5vh;
  overflow-y: auto;
  overflow-x: none;
  color: #303030;
  background-color: #f7f8fc;
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
