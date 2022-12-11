import styled, { css } from "styled-components";
import Modal from "react-modal";

export const ModalWrapper = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  width: 50%;
  padding: 20px;
  background-color: #f7f8fc;
  color: #303030;
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
  grid-gap: 1px;
`;

export const Details = styled.div`
  margin-top: 1vh;
  height: 5vh;
  width: 100%;
  text-align: center;
  line-height: 5vh;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  ${(props) =>
    props.title &&
    css`
      font-weight: 800;
    `}
  ${(props) =>
    props.description &&
    css`
      height: 20vh;
      line-height: 2vh;
    `}
`;
