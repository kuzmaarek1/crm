import styled, { css } from "styled-components";

type CellWrapperProps = {
  readonly index: number;
  readonly boldText: boolean;
  readonly team: boolean;
};

export const CellWrapper = styled.div<CellWrapperProps>`
  display: flex;
  text-align: center;
  height: 5vh;
  justify-content: center;
  margin-right: 0px;
  align-items: center;
  ${({ boldText }) =>
    boldText &&
    css`
      font-weight: 800;
    `}
  ${({ boldText, team }) =>
    boldText &&
    team &&
    css`
      grid-column: span 2 / span 2;
      width: 85%;
    `}
  @media (max-width: 1024px) and (min-width: 768px) {
    ${({ index }) =>
      index > 3 &&
      css`
        display: none;
      `}
  }
  @media (max-width: 768px) and (min-width: 640px) {
    ${({ index }) =>
      index > 2 &&
      css`
        display: none;
      `}
  }
  @media (max-width: 640px) {
    ${({ index }) =>
      index > 1 &&
      css`
        display: none;
      `}
  }

  &:hover {
    cursor: ${({ boldText }) => (boldText ? "default" : "pointer")};
  }
`;
