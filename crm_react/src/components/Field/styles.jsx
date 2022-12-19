import styled, { css } from "styled-components";

export const FieldWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 6vh;
  margin-bottom: ${(props) => (props.textarea ? "10vh" : "3vh")};
`;
export const Input = styled.input`
  position: absolute;
  padding-left: 5%;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: rgba(112, 112, 112, 0.1);
  color: #616161;
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  border-radius: 25px;
  resize: none;
  transition-property: all;
  transition-timing-function: ease-in;
  transition-duration: 200ms;
  border: ${(props) =>
    props.error ? "1px solid #a90e46" : "1px solid #616161"};
  &:focus {
    outline: none;
    font-size: 1rem;
    box-shadow: ${(props) =>
      props.error ? "0 0 2px #a90e46" : "0 0 2px #616161"};
  }
  ${(props) =>
    props.empty &&
    css`
      outline: none;
      font-size: 1rem;
      box-shadow: ${(props) =>
        props.error ? "0 0 2px #a90e46" : "0 0 2px #616161"};
    `}
`;

export const Textarea = styled(Input)`
  height: 12vh;
  padding-top: 2vh;
`;

export const Label = styled.label`
  width: ${(props) => (props.small ? "100px" : "140px")};
  position: absolute;
  top: 50%;
  left: 5%;
  right: auto;
  bottom: auto;
  transform: translate(0%, -50%);
  transition-property: transform;
  transition-timing-function: ease-in;
  transition-duration: 300ms;

  input:focus ~ &&,
  textarea:focus ~ && {
    transform: translate(-30%, -4.5vh) scale(0.9);
    text-align: start;
    font-size: 12px;
    color: white;
    background-color: ${(props) => (props.error ? "#a90e46" : "#616161")};
    border-radius: 10px;
    padding: 5px;
    padding-left: 6px;
    letter-spacing: 0.05em;
  }

  ${(props) => {
    let backgroundColor = props.error ? "#a90e46" : "#616161";
    if (props.empty === false)
      return css`
        transform: translate(-30%, -4.5vh) scale(0.9);
        text-align: start;
        font-size: 12px;
        color: white;
        background-color: ${backgroundColor};
        border-radius: 10px;
        padding: 5px;
        padding-left: 6px;
        letter-spacing: 0.05em;
      `;
  }}
`;

export const Span = styled.span`
  position: absolute;
  bottom: ${(props) => (props.textarea ? "-8vh" : "-2vh")};
  display: flex;
  font-size: 11px;
  width: 100%;
  font-weight: 600;
  color: #a90e46;
  justify-content: flex-end;
`;
