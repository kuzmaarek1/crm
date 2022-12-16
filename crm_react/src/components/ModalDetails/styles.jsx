import styled, { css } from "styled-components";
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
  color: #303030;
  outline: none;
  border: 1px solid #616161;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  width: 30%;
  align-items: flex-end;
  flex-direction: row;
  margin-left: 70%;
`;

export const DetailsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 5px;
  max-height: 80vh;
  overflow-y: auto;
  overflow-x: none;
`;

export const Details = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
