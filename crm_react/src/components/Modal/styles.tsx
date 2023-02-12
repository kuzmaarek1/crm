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
  background-color: ${({ theme }) => theme.colors.lightGrey};
  border: 3px solid ${({ theme }) => theme.colors.grey};
  box-shadow: 0 0 30000px ${({ theme }) => theme.colors.grey};
  color: #303030;
  outline: none;
  @media (max-width: 640px) {
    max-height: 95%;
    width: 95%;
    padding: 10px;
  }
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
  color: ${({ theme }) => theme.colors.red};
  right: 10px;
  top: 5px;
`;
