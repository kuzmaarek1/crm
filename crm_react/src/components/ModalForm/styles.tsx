import styled, { css } from "styled-components";
import type { LiProps } from "types/components/ModalForm";

export const Header = styled.h1`
  color: ${({ theme }) => theme.colors.darkGrey};
  text-align: center;
  padding-top: 0px;
  margin: 10px;
`;

export const Form = styled.form`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Label = styled.label`
  display: flex;
  margin-bottom: 5vh;
  width: 40%;
  height: 13%;
  align-items: center;
`;

export const Span = styled.span`
  position: absolute;
  bottom: 5px;
  display: flex;
  font-size: 10px;
  width: 100%;
  color: ${({ theme }) => theme.colors.red};
  justify-content: flex-end;
`;

export const ButtonWrapper = styled.div`
  width: 50%;
  @media (max-width: 640px) {
    width: 90%;
  }
`;

export const ButtonDowshift = styled.button`
  position: absolute;
  top: 0;
  right: 2%;
  height: 50px;
  margin: auto;
  cursor: pointer;
  background-color: transparent;
  border: 0px;
  outline: none;
`;

export const Ul = styled.ul`
  display: block;
  overflow-y: scroll;
  overflow-x: none;
  max-height: calc(16vh - 4px);
  position: absolute;
  z-index: 100;
  top: 100%;
  margin: auto;
  left: 0;
  right: 0;
  width: 95%;
  list-style: none;
  padding: 0;
`;

export const Li = styled.li<LiProps>`
  overflow: visible;
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  background-color: white;
  box-shadow: -2px 4px 10px rgba(115, 124, 142, 0.09);
  border: 1px solid #737c8e;
  margin-top: -1px;
  :last-child {
    margin-bottom: 1px;
  }
  border-radius: 25px;
  font-family: "Montserrat", sans-serif;
  height: 4vh;
  font-size: 0.9rem;
  ${({ highlighted, selectedItem }) =>
    (highlighted || selectedItem) &&
    css`
      background-color: rgba(197, 220, 250, 1);
      color: ${({ theme }) => theme.colors.blue};
      border: 1px solid ${({ theme }) => theme.colors.blue};
      font-weight: ${({ selectedItem }) => (selectedItem ? "600" : "400")};
    `}
`;
