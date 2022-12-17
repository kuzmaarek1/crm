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
  width: 80%;
  padding: 20px;
  background-color: #f7f8fc;
  border: 3px solid #e0e0e0;
  box-shadow: 0 0 30000px #e0e0e0c0;
  color: #303030;
  outline: none;
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

export const NavbarDetails = styled.div`
  display: flex;
  justify-content: flex-start;
  align-content: center;
`;

export const Header = styled.h1`
  width: 50%;
  margin-left: 2vw;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 50%;
  gap: 5px;
`;

export const DetailsWrapper = styled.div`
  display: grid;
  margin-top: 1vh;
  grid-template-columns: repeat(2, 1fr);
  max-height: 80vh;
  overflow-y: auto;
  overflow-x: none;
  ${(props) => {
    if (!props.team)
      return css`
        div:nth-child(4n),
        div:nth-child(4n + 3) {
          background-color: #e0e0e0;
        }
      `;
    else
      return css`
        div:nth-child(4n + 1):nth-child(-n + 5),
        div:nth-child(4n + 2):nth-child(-n + 5) {
          background-color: #e0e0e0;
        }
        div:nth-child(n + 5):nth-child(2n + 1) {
          background-color: #e0e0e0;
        }
      `;
  }}
`;

export const Details = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5vh;
  width: 100%;
  text-align: center;
  ${(props) =>
    props.title &&
    css`
      font-weight: 800;
    `}
  ${(props) => {
    if (props.description)
      return css`
        height: 20vh;
      `;
    else if (props.member) {
      return css`
        grid-column: span 2 / span 2;
      `;
    }
  }}
`;
