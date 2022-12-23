import styled, { css } from "styled-components";

export const CellWrapper = styled.div`
  display: flex;
  text-align: center;
  height: 5vh;
  justify-content: ${(props) => (props.button ? "flex-end" : "center")};
  margin-right: ${(props) => (props.button ? "15px" : "0px")};
  align-items: center;

  ${(props) =>
    props.title &&
    css`
      font-weight: 800;
    `}
  ${(props) =>
    props.title &&
    props.team &&
    css`
      grid-column: span 2 / span 2;
      width: 85%;
    `}
  &:hover {
    cursor: ${(props) => (props.title ? "default" : "pointer")};
  }
`;
