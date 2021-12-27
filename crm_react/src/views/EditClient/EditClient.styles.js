import styled from "styled-components";

export const EditClientWrapper = styled.div`
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
color:#616161;
background-color: #f7f8fc;
height: 92.5vh;
`;

export const EditClientHeader=styled.h1`
 color:#616161;
 margin-bottom:5vh;
 margin-top:-25vh;
`;
export const EditClientForm=styled.form`
  display:flex;
  width:35%;
  flex-wrap: wrap;
`
export const EditClientLabel=styled.label`
  display:flex;
  width:40%;
  height: 15%;
  margin-bottom:4vh;
  align-items: center;
`;
export const EditClientSpan=styled.span`
    display: flex;
    width: 100%;
    margin-top:-4vh;
    margin-left:40%;
    color:#a90e46;
    justify-content: center;
`;
export const EditClientInput = styled.input`
  width:60%;
  height: 15%;
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

export const EditClientTextarea  = styled.textarea`
  display:block;
  width:60%;
  height: 30%;
  padding: 10px 12px;
  border: 1px solid #737C8E;
  box-sizing: border-box;
  color:#616161;
  box-shadow: -2px 4px 10px rgba(115, 124, 142, 0.09);
  font-size: 1rem;
  border-radius: 25px;
  resize: none;
  margin-bottom:4vh;
  &:focus {
    outline: none;
    font-size: 1rem;
    color:#616161;
    box-shadow: -2px 4px 10px rgba(115, 124, 142, 0.3);
  }
`;

export const EditClientSelect = styled.select`
  width:60%;
  height: 15%;
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