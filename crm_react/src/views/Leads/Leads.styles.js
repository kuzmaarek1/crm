import styled,{ css } from "styled-components";
import { NavLink } from "react-router-dom";

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