import styled, { css } from "styled-components";

type WrapperProps = {
  readonly isLogin: boolean;
};

export const Wrapper = styled.div<WrapperProps>`
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.darkGrey};
  background-color: ${({ theme }) => theme.colors.lightGrey};
  height: 92.5vh;
  ${({ isLogin }) =>
    isLogin
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
  color: ${({ theme }) => theme.colors.darkGrey};
  margin-bottom: 5vh;
  margin-top: -10vh;
`;
export const Form = styled.form`
  display: flex;
  width: 40%;
  flex-wrap: wrap;
  @media (max-width: 820px) {
    width: 90vw;
  }
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
  @media (max-width: 820px) {
    width: 90vw;
  }
`;
