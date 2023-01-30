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
  @media (max-width:  1024px) and (min-width:768px) {
    ${(props) =>
      props.index > 3 &&
      css`
        display: none;
      `}
  }
  @media (max-width: 768px) and (min-width: 640px) {
    ${(props) =>
      props.index > 2 &&
      css`
        display: none;
      `}
  }
  @media (max-width: 640px) {
    ${(props) =>
      props.index > 1 &&
      css`
        display: none;
      `}
  }

  &:hover {
    cursor: ${(props) => (props.title ? "default" : "pointer")};
  }
`;
