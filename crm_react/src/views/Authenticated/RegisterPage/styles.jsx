import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #616161;
  background-color: #f7f8fc;
  height: 92.5vh;
`;

export const Header = styled.h1`
  color: #616161;
  margin-bottom: 5vh;
  margin-top: -15vh;
`;
export const Form = styled.form`
  display: flex;
  width: 35%;
  flex-wrap: wrap;
`;
export const Label = styled.label`
  display: flex;
  width: 40%;
  height: 30%;
  margin-bottom: 5vh;
  align-items: center;
`;
export const Span = styled.span`
  display: flex;
  width: 100%;
  margin-top: -7vh;
  margin-left: 40%;
  color: #a90e46;
  justify-content: center;
`;
export const Input = styled.input`
  width: 60%;
  height: 20%;
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
