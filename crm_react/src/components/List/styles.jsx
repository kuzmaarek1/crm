import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";

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
export const LinkWrapper = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 10vh;
`;
export const Link = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 8vw;
  height: 8vh;
  text-decoration: none;
  border: none;
  background: rgba(197, 220, 250, 0.5);
  color: #0f56b3;
  font-family: "Mulish", sans-serif;
  border-radius: 100px !important;
`;

export const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.team ? "repeat(2, 1fr)" : "repeat(5, 1fr)"};
  margin-top: 1vh;
  height: 5vh;
  width: 100%;
  text-align: center;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  ${(props) =>
    props.title &&
    css`
      font-weight: 800;
    `}
  &:hover {
    cursor: pointer;
  }
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
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.team &&
    css`
      justify-content: flex-end;
      margin-right: 20px;
    `}
`;
