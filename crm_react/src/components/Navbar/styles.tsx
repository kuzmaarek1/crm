import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import type { TypeShowNavbar } from "types/components/Navbar";

export const Wrapper = styled.nav`
  position: relative;
  width: 100vw;
  height: 7.5vh;
  background-color: ${({ theme }) => theme.colors.darkGrey};
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-direction: row;
  @media (max-width: 640px) {
    height: 50px;
  }
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
  margin-right: 5px;
`;

export const HaburgerLines = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 7.5vh;
  width: 30px;
  @media (min-width: 640px) {
    display: none;
  }
`;

export const HaburgerLine = styled.span<TypeShowNavbar>`
  height: 3px;
  background-color: ${({ showNavbar }) =>
    showNavbar ? "transparent" : "white"};
  width: 100%;
  border-radius: 10px;
  transition: transform 0.2s ease-in-out;
  position: relative;
  &:before,
  &:after {
    content: " ";
    position: absolute;
    width: 100%;
    height: 3px;
    background-color: white;
    border-radius: 10px;
  }
  &:before {
    top: -10px;
    transition: transform 0.4s ease-in-out;
    transform: ${({ showNavbar }) =>
      showNavbar && "translate(0px, 10px) rotateZ(45deg)"};
  }
  &:after {
    top: 10px;
    transition: transform 0.4s ease-in-out;
    transform: ${({ showNavbar }) =>
      showNavbar && "translate(0px, -10px) rotateZ(-45deg)"};
  }
`;

export const MobileUl = styled.div<TypeShowNavbar>`
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
    background-color: ${({ theme }) => theme.colors.darkGrey};
    transition: transform 0.5s ease-in-out;
    ${({ showNavbar }) =>
      showNavbar
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
