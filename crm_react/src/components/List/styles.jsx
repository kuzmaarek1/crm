import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 92.5vh;
  overflow: auto;
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
  ${(props) =>
    !props.team &&
    css`
      @media (max-width: 1024px) and (min-width: 768px) {
        grid-template-columns: repeat(4, minmax(0, 1fr));
        grid-template-rows: repeat(4, minmax(0, 1fr));
      }
      @media (max-width: 768px) and (min-width: 640px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-template-rows: repeat(3, minmax(0, 1fr));
      }
      @media (max-width: 640px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-template-rows: repeat(2, minmax(0, 1fr));
      }
    `}
`;
