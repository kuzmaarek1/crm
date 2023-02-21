import styled, { css } from "styled-components";
import type {
  TypeTextarea,
  CheckFieldProps,
  TextareaProps,
} from "types/components/Field";

export const FieldWrapper = styled.div<TypeTextarea>`
  position: relative;
  width: 100%;
  height: 50px;
  margin-bottom: ${({ textarea }) => (textarea ? "40px" : "20px")};
`;

export const Input = styled.input<CheckFieldProps>`
  position: absolute;
  padding-left: 5%;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: rgba(112, 112, 112, 0.1);
  color: ${({ theme }) => theme.colors.darkGrey};
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  border-radius: 25px;
  resize: none;
  transition-property: all;
  transition-timing-function: ease-in;
  transition-duration: 200ms;
  border: ${({ error, theme }) =>
    error
      ? `1px solid ${theme.colors.red}`
      : `1px solid ${theme.colors.darkGrey}`};
  &:focus {
    outline: none;
    box-shadow: ${({ error, theme }) =>
      error
        ? `0 0 2px ${theme.colors.red}`
        : `0 0 2px ${theme.colors.darkGrey}`};
  }
  ${({ empty, error, theme }) =>
    !empty &&
    css`
      outline: none;
      box-shadow: ${() =>
        error
          ? `0 0 2px ${theme.colors.red}`
          : `0 0 2px ${theme.colors.darkGrey}`};
    `}
`;

export const Textarea = styled(Input)<TextareaProps>`
  height: 70px;
  padding-top: 10px;
`;

export const Label = styled.label<CheckFieldProps>`
  width: 100px;
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
    transform: translate(-30%, -40px) scale(0.9);
    text-align: start;
    font-size: 12px;
    color: white;
    background-color: ${({ error, theme }) =>
      error ? theme.colors.red : theme.colors.darkGrey};
    border-radius: 10px;
    padding: 5px;
    padding-left: 6px;
    letter-spacing: 0.05em;
  }

  ${({ error, empty, theme }) => {
    let backgroundColor: string = error
      ? theme.colors.red
      : theme.colors.darkGrey;
    if (!empty)
      return css`
        transform: translate(-30%, -40px) scale(0.9);
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

export const Span = styled.span<TypeTextarea>`
  position: absolute;
  bottom: ${({ textarea }) => (textarea ? "-35px" : "-15px")};
  display: flex;
  font-size: 11px;
  width: 100%;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.red};
  justify-content: flex-end;
`;
