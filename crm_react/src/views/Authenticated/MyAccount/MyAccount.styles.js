import styled,{css} from "styled-components";

export const MyAccountWrapper = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    color:#616161;
    background-color: #f7f8fc;
    height: 92.5vh;
    width: 100%;
`;

export const MyAccountButton=styled.button`
  width: 20% ;
  height: 7vh;
  border: none;
  background: rgba(197, 220, 250, 0.5);
  color: #0f56b3;
  font-family: "Mulish", sans-serif;
  border-radius: 100px !important;
  cursor:pointer;
}`;

export const DetailsWrapper=styled.div`
  display:grid;
  grid-template-columns: repeat(2,20vw);
  grid-gap:1px;
  margin-bottom:3vh;
`;

export const DetailsLeadWrapper = styled.div`
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
`;