import styled, { css } from "styled-components";

type ButtonProps = {
  readonly width?: string;
  readonly height?: string;
  readonly red?: boolean;
  readonly fontSmall?: boolean;
  readonly team?: boolean;
};

export const Button = styled.button<ButtonProps>`
  position: relative;
  width: ${({ width }) => (width ? width : "100%")};
  height: ${({ height }) => (height ? height : "7vh")};
  background: ${({ red, theme }) =>
    red ? theme.colors.lightRed : theme.colors.lightBlue};
  color: ${({ red, theme }) => (red ? theme.colors.red : theme.colors.blue)};
  font-family: "Mulish", sans-serif;
  border-radius: 100px !important;
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  font-size: ${({ fontSmall }) => (fontSmall ? "0.7em" : "1em")};
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition-property: all;
  transition-timing-function: ease-in;
  transition-duration: 500ms;
  border: ${({ red, theme }) =>
    red ? `1px solid ${theme.colors.red}` : `1px solid ${theme.colors.blue}`};
  ${({ team, red, theme }) =>
    team &&
    css`
      background: ${() =>
        red ? theme.colors.lightRed : "rgba(202, 225, 255, 1)"};
      font-size: 0.9em;
    `}
  &:before, &:after {
    content: "";
    position: absolute;
    width: ${({ team }) => (team ? "15px" : "25px")};
    height: ${({ team }) => (team ? "8px" : "15px")};
    border-radius: 15px;
    inset: 0;
    top: ${({ team }) => (team ? "-4px" : "-7px")};
    left: ${({ team }) => (team ? "calc(20% - 10px)" : "calc(20% - 12.5px)")};
    background-color: ${({ red, theme }) =>
      red ? theme.colors.lightRed : "rgba(197, 220, 250, 1)"};
    border: ${({ red, theme }) =>
      red
        ? `1.5px solid ${theme.colors.red}`
        : `1.5px solid ${theme.colors.blue}`};
    transition-timing-function: ease-in;
    transition-duration: 500ms;
    pointer-events: none;
  }
  &:after {
    top: ${({ team }) => (team ? "calc(100% - 4px)" : "calc(100% - 7px)")};
    left: ${({ team }) => (team ? "calc(80% - 10px)" : "calc(80% - 12.5px)")};
  }

  &:hover {
    letter-spacing: 0.2em;
    background-color: ${({ red, theme }) =>
      red ? theme.colors.lightRed : "rgba(197, 220, 250, 1)"};
    box-shadow: ${({ red, theme }) =>
      red ? `0 0 15px ${theme.colors.red}` : `0 0 15px ${theme.colors.blue}`};
    &:before {
      left: ${({ team }) => (team ? "calc(80% - 10px)" : "calc(80% - 12.5px)")};
    }
    &:after {
      left: ${({ team }) => (team ? "calc(20% - 10px)" : "calc(20% - 12.5px)")};
    }
  }
`;
