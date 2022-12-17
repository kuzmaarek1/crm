import styled, { css } from "styled-components";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-modal";

export const ModalWrapper = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  transform: translate(-50%, -50%);
  width: 70%;
  padding: 20px;
  background-color: #f7f8fc;
  color: #303030;
  border: 3px solid #e0e0e0;
  box-shadow: 0 0 30000px #e0e0e0c0;
  outline: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${(props) => {
    if (props.isOpen)
      return css`
        animation-name: zoomIn;
        animation-duration: 0.5s;
      `;
    else
      return css`
        animation-name: zoomOut;
        animation-duration: 0.5s;
        opacity: 0;
      `;
  }}
`;

export const CloseButton = styled(IoCloseSharp)`
  position: absolute;
  cursor: pointer;
  color: #a90e46;
  right: 15px;
  top: 5px;
`;

export const Header = styled.h1`
  color: #616161;
`;
export const Form = styled.form`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
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
  color: #a90e46;
  justify-content: flex-end;
`;

export const ButtonDowshift = styled.button`
  position: absolute;
  top: 0;
  right: 2%;
  height: 5vh;
  margin: auto;
  cursor: pointer;
  background-color: transparent;
  border: 0px;
  outline: none;
`;

export const Ul = styled.ul`
  display: block;
  overflow-y: auto;
  overflow-x: none;
  min-height: 4vh;
  max-height: calc(16vh - 3.5px);
  position: absolute;
  z-index: 100;
  top: calc(100% - 1px);
  margin: auto;
  right: 0;
  width: 100%;
  list-style: none;
  padding: 0;
`;

export const Li = styled.li`
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  background-color: white;
  box-shadow: -2px 4px 10px rgba(115, 124, 142, 0.09);
  border: 1px solid #737c8e;
  border-radius: 25px;
  font-family: "Montserrat", sans-serif;
  height: 4vh;
  font-size: 0.9rem;
  margin-bottom: -1px;
  ${({ highlighted, selectedItem }) =>
    (highlighted || selectedItem) &&
    css`
      background-color: rgba(197, 220, 250, 1);
      color: #0f56b3;
      border: 1px solid #0f56b3;
      font-weight: ${({ selectedItem }) => (selectedItem ? "600" : "400")};
    `}
`;
