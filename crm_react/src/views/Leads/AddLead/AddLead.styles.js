import styled from "styled-components";

export const AddLeadWrapper = styled.div`
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
color:#616161;
background-color: #f7f8fc;
height: 92.5vh;
`;

export const AddLeadHeader=styled.h1`
 color:#616161;
 margin-bottom:5vh;
 margin-top:-25vh;
`;
export const AddLeadForm=styled.form`
  display:flex;
  width:35%;
  flex-wrap: wrap;
`
export const AddLeadLabel=styled.label`
  display:flex;
  width:40%;
  height: 13%;
  margin-bottom:4vh;
  align-items: center;
`;
export const AddLeadSpan=styled.span`
    display: flex;
    width: 100%;
    margin-top:-3vh;
    margin-left:40%;
    color:#a90e46;
    justify-content: center;
`;
export const AddLeadInput = styled.input`
  width:60%;
  height: 13%;
  padding: 10px 12px;
  border: 1px solid #737C8E;
  box-sizing: border-box;
  color:#616161;
  box-shadow: -2px 4px 10px rgba(115, 124, 142, 0.09);
  font-size: 1rem;
  border-radius: 25px;
  resize: none;
  &:focus {
    outline: none;
    font-size: 1rem;
    color:#616161;
    box-shadow: -2px 4px 10px rgba(115, 124, 142, 0.3);
  }
`;

export const AddLeadTextarea  = styled.textarea`
  display:block;
  width:60%;
  height: 60%;
  padding: 10px 12px;
  border: 1px solid #737C8E;
  box-sizing: border-box;
  color:#616161;
  box-shadow: -2px 4px 10px rgba(115, 124, 142, 0.09);
  font-size: 1rem;
  border-radius: 25px;
  resize: none;
  margin-bottom:3vh;
  &:focus {
    outline: none;
    font-size: 1rem;
    color:#616161;
    box-shadow: -2px 4px 10px rgba(115, 124, 142, 0.3);
  }
`;