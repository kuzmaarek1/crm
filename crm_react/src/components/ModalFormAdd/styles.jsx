import styled from "styled-components";
import Modal from "react-modal";

export const ModalWrapper = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  transform: translate(-50%, -50%);
  width: 70%;
  padding: 20px;
  background-color: #f7f8fc;
  color: #303030;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.h1`
  color: #616161;
`;
export const Form = styled.form`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;
export const Label = styled.label`
  display: flex;
  width: 40%;
  height: 13%;
  margin-bottom: 2vh;
  align-items: center;
`;
export const InputWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
`;
export const Span = styled.span`
  position: absolute;
  bottom: 5px;
  display: flex;
  font-size: 10px;
  width: 100%;
  color: #a90e46;
  justify-content: flex-end;
`;
export const Input = styled.input`
  width: 60%;
  height: 5vh;
  margin-bottom: 3vh;
  padding: 10px 12px;
  border: 1px solid #737c8e;
  box-sizing: border-box;
  color: #616161;
  box-shadow: -2px 4px 10px rgba(115, 124, 142, 0.09);
  font-size: 1rem;
  border-radius: 25px;
  font-family: "Montserrat", sans-serif;
  resize: none;
  &:focus {
    outline: none;
    font-size: 1rem;
    color: #616161;
    box-shadow: -2px 4px 10px rgba(115, 124, 142, 0.3);
  }
`;
export const Textarea = styled.textarea`
  display: block;
  font-family: "Montserrat", sans-serif;
  margin-bottom: 3vh;
  width: 60%;
  height: 20vh;
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
