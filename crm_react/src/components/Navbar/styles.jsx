import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";

export const Wrapper = styled.nav`
  position: relative;
  width: 100vw;
  height: 7.5vh;
  background-color: #616161;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-direction: row;
`;

export const TitleWrapper = styled.div`
  width: 55vw;
  @media (max-width: 800px) {
    width: 50vw;
  }
  @media (max-width: 640px) {
    width: 100%;
  }
`;

export const Title = styled(NavLink)`
  width: 100%;
  margin-left: 2vw;
  width: 20%;
  color: white;
  font-size: 1.5em;
  text-decoration: none;
  @media (max-width: 800px) {
    font-size: 0.9em;
  }
  &:hover,
  &.active {
    text-decoration: none;
    color: white;
  }
`;

export const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 45vw;
  @media (max-width: 800px) {
    width: 50vw;
    font-size: 0.9em;
  }
  @media (max-width: 640px) {
    width: 0vw;
    display: none;
  }
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
  transition-property: all;
  transition-timing-function: ease-out;
  transition-duration: 200ms;
  &:hover,
  &.active {
    text-decoration: none;
    color: white;
    border-bottom: 2px solid white;
  }
`;

export const MobileNavbar = styled.div`
  @media (min-width: 640px) {
    display: none;
  }
`;

export const HaburgerLines = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-right: 5px;
  height: 26px;
  width: 32px;
  @media (min-width: 640px) {
    display: none;
  }
`;

export const HaburgerLine = styled.span`
  height: 4px;
  background-color: white;
  width: 100%;
  border-radius: 10px;

  ${(props) => {
    if (props.number === 1) {
      return css`
        transition: transform 0.4s ease-in-out;
        transform-origin: -1px 0%;
      `;
    }
    if (props.number === 2) {
      return css`
        transition: transform 0.2s ease-in-out;
      `;
    }
    if (props.number === 3) {
      return css`
        transition: transform 0.4s ease-in-out;
        transform-origin: -1px 100%;
      `;
    }
  }}
  ${(props) => {
    if (props.showNavbar) {
      if (props.number === 1) {
        return css`
          transform: rotate(45deg);
        `;
      }
      if (props.number === 2) {
        return css`
          transform: scaleY(0);
        `;
      }
      if (props.number === 3) {
        return css`
          transform: rotate(-45deg);
        `;
      }
    }
  }}
`;

export const MobileUl = styled.div`
  @media (min-width: 640px) {
    display: none;
  }
  @media (max-width: 640px) {
    position: absolute;
    z-index: 1;
    top: 100%;
    left: 0;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #616161;
    transition: transform 0.5s ease-in-out;
    ${(props) =>
      props.showNavbar
        ? css`
            transform: translate(-150%);
          `
        : css`
            transform: translate(0%);
          `}
  }
`;

export const MobileLink = styled(NavLink)`
  @media (min-width: 640px) {
    display: none;
  }
  @media (max-width: 640px) {
    z-index: 10;
    display: flex;
    padding: 15px;
    margin-bottom: 1vh;
    justify-content: center;
    display: block;
    color: white;
    border-bottom: 2px solid transparent;
    padding-bottom: 2px;
    font-size: 0.9em;
    text-decoration: none;
    transition-property: all;
    transition-timing-function: ease-out;
    transition-duration: 200ms;
    &:hover,
    &.active {
      text-decoration: none;
      color: white;
      border-bottom: 2px solid white;
    }
  }
`;
