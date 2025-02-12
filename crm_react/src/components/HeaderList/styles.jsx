import styled from "styled-components";
import { BiSearch } from "react-icons/bi";

export const HeaderListWrapper = styled.header`
  display: grid;
  grid-template-columns: minmax(0, 0.6fr) minmax(0, 1fr) minmax(0, 0.6fr);
  align-items: center;
  height: 10vh;
  width: 100%;
  @media (max-width: 640px) {
    height: 20vh;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: repeat(2, minmax(0, 1fr));
  }
`;
export const Header = styled.h1`
  margin-left: 2vw;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 640px) {
    grid-column: span 2 / span 2;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
    margin-right: 20px;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #737c8e;
  color: ${({ theme }) => theme.colors.darkGrey};
  background-color: rgba(112, 112, 112, 0.1);
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  border-radius: 25px;
  transition-property: all;
  transition-timing-function: ease-in;
  transition-duration: 200ms;
  &::placeholder {
    color: ${({ theme }) => theme.colors.darkGrey};
    font-family: "Montserrat", sans-serif;
  }
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.blue};
    background-color: ${({ theme }) => theme.colors.lightBlue};
    box-shadow: 0 0 6px ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.blue};
    outline: none;
    font-size: 1rem;
    &::placeholder {
      color: ${({ theme }) => theme.colors.blue};
      font-family: "Montserrat", sans-serif;
    }
  }
`;

export const SearchIcon = styled(BiSearch)`
  position: absolute;
  right: 5px;
  cursor: pointer;
  transition-property: all;
  transition-timing-function: ease-in;
  transition-duration: 200ms;
  input:focus ~ && {
    background-color: transparent;
    color: ${({ theme }) => theme.colors.blue};
    outline: none;
  }
`;

export const Label = styled.label`
  width: 90%;
  font-size: 10px;
  color: white;
  background-color: ${({ theme }) => theme.colors.darkGrey};
  position: absolute;
  top: -7px;
  left: 0;
  right: 0;
  margin: auto;
  bottom: auto;
  border-radius: 10px;
  padding: 1px;
  letter-spacing: 0.05em;
  text-align: center;
  transition-property: all;
  transition-timing-function: ease-in;
  transition-duration: 200ms;
  input:focus ~ && {
    background-color: ${({ theme }) => theme.colors.blue};
    color: white;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
  @media (max-width: 640px) {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
  }
`;
