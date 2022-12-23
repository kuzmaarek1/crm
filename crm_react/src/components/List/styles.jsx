import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  height: 92.5vh;
  overflow-y: auto;
  overflow-x: none;
  color: #303030;
  background-color: #f7f8fc;
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
    styles += `div:nth-child(4n-1), div:nth-child(4n-2) {
        background-color: #e0e0e0;
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
    props.team
      ? "minmax(0, 0.85fr) minmax(0, 0.15fr)"
      : "repeat(5, minmax(0, 1fr))"};
  ${(props) => backgroundRow(props)}
`;
