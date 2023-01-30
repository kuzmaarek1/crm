import styled from "styled-components";
import { IoCloseSharp } from "react-icons/io5";

export const ModalWrapper = styled.div`
  width: 100%;
  display: ${(props) => (props.modalIsOpen ? "block" : "none")};
`;
export const CloseButton = styled(IoCloseSharp)`
  position: absolute;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.red};
  right: 10px;
  top: 5px;
`;
