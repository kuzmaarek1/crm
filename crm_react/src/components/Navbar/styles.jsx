import styled from "styled-components";
import { NavLink } from "react-router-dom";
export const Wrapper = styled.div`
  width: 100%;
  height: 7.5vh;
  background-color: #616161;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-direction: row;
`;

export const Title = styled(NavLink)`
  display: flex;
  justify-content: flex-start;
  margin-left: 2vw;
  width: 20%;
  color: white;
  font-size: 1.5em;
  text-decoration: none;
  &:hover,
  &.active {
    text-decoration: none;
    color: white;
  }
`;

export const Links = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

export const Link = styled(NavLink)`
  margin-right: 2vw;
  justify-content: center;
  align-items: center;
  display: block;
  color: white;
  border-bottom: 2px solid transparent;
  padding-bottom: 2px;
  text-decoration: none;
  &:hover,
  &.active {
    text-decoration: none;
    color: white;
    border-bottom: 2px solid white;
  }
`;
