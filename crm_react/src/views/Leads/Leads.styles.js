import styled,{ css } from "styled-components";
import { NavLink } from "react-router-dom";
import Modal from 'react-modal';

export const LeadsWrapper=styled.div`
    color:#303030;
    background-color: #f7f8fc;
`

export const LeadTitle=styled.div`
    display:flex;
    flex-direction: row;

`
export const LeadHeader=styled.h1`
    margin-left:2vw;
`;
export const LeadLink=styled(NavLink)`
    margin-left:85%;
    margin-top: 1%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10vw;
    height: 7vh;
    text-decoration:none;
    border: none;
    background: rgba(197, 220, 250, 0.5);
    color: #0f56b3;
    font-family: "Mulish", sans-serif;
    border-radius: 100px !important
`;

export const LeadWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top:1vh;
  height: 5vh;
  width: 100%;
  text-align: center;
  line-height: 5vh;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  ${props => props.title && css`
    font-weight: 800;
  `}
  &:hover {
    cursor: pointer;
  }
`;

export const LeadModal=styled(Modal)`
  display: flex;
  flex-direction: column;
  margin:auto;
  margin-top:25vh;
  //justify-content: center;
 // align-items: center;
  width: 50%;
  height: 50%;
  background-color: #f7f8fc;
  color:#303030;
`;

export const ModalButton=styled.div`
  display: flex;
  width: 30%;
  align-items: flex-end;
  flex-direction: row;
  margin-left:70%;
`;

export const ModalWrapper=styled.div`
  display:grid;
  grid-template-columns: repeat(2,1fr);
  grid-gap:1px;
`;

export const ModalLeadWrapper = styled.div`
  margin-top:1vh;
  height: 5vh;
  width: 100%;
  text-align: center;
  line-height: 5vh;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  ${props => props.title && css`
    font-weight: 800;
  `}
  ${props => props.description && css`
    height:400%;
    line-height: 2vh;
  `}
`;