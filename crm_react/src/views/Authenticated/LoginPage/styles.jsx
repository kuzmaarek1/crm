import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #616161;
  background-color: #f7f8fc;
  height: 92.5vh;
  ${(props) =>
    props.isLogin
      ? css`
          animation-name: backInLeft;
          animation-duration: 0.5s;
        `
      : css`
          animation-name: backInRight;
          animation-duration: 0.5s;
          overflow-x: hidden;
        `}
`;

export const Header = styled.h1`
  color: #616161;
  margin-bottom: 5vh;
  margin-top: -10vh;
`;
export const Form = styled.form`
  display: flex;
  width: 40%;
  flex-wrap: wrap;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const ButtonSwitchWrapper = styled.div`
  display: flex;
  margin-top: 3vh;
  width: 50%;
  flex-direction: column;
  justify-content: center;
`;
