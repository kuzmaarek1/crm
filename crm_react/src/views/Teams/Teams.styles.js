import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import Modal from "react-modal";

export const TeamsWrapper = styled.div`
  color: #303030;
  background-color: #f7f8fc;
`;

export const TeamTitle = styled.div`
  display: flex;
  flex-direction: row;
  height: 10vh;
`;
export const TeamHeader = styled.h1`
  width: 40%;
  margin-left: 2vw;
`;
export const TeamLink = styled(NavLink)`
  margin-left: 85%;
  margin-top: 1%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10vw;
  height: 7vh;
  text-decoration: none;
  border: none;
  background: rgba(197, 220, 250, 0.5);
  color: #0f56b3;
  font-family: "Mulish", sans-serif;
  border-radius: 100px !important;
`;

export const TeamWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 1vh;
  width: 100%;
  text-align: center;
  align-items: center;
  line-height: 5vh;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  ${(props) =>
    props.title &&
    css`
      font-weight: 800;
    `}
  &:hover {
    cursor: pointer;
  }
`;

export const TeamForm = styled.form`
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const TeamLinkDiv = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 10vh;
`;
export const TeamInput = styled.input`
  width: 120%;
  padding: 10px 12px;
  border: 1px solid #737c8e;
  box-sizing: border-box;
  color: #616161;
  box-shadow: -2px 4px 10px rgba(115, 124, 142, 0.09);
  font-size: 1rem;
  border-radius: 25px;
  resize: none;
  &:focus {
    outline: none;
    font-size: 1rem;
    color: #616161;
    box-shadow: -2px 4px 10px rgba(115, 124, 142, 0.3);
  }
`;

export const TeamModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 25vh;
  width: 50%;
  height: 50%;
  background-color: #f7f8fc;
  color: #303030;
`;

export const ModalButton = styled.div`
  display: flex;
  width: 30%;
  align-items: flex-end;
  flex-direction: row;
  margin-left: 70%;
`;

export const ModalWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1px;
`;
export const ModalTeamMember = styled.div`
  grid-column: span 2 / span 2;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export const ModalTeamWrapper = styled.div`
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
