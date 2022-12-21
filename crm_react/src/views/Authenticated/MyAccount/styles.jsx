import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #616161;
  background-color: #f7f8fc;
  height: 92.5vh;
  width: 100%;
  @media (max-width: 640px) {
    font-size: 0.8rem;
  }
`;

export const Header = styled.h1`
  margin-top: -7.5vh;
`;

export const ButtonWrapper = styled.div`
  width: ${({ small }) => (small ? "300px" : "500px")};
  display: flex;
  gap: 5px;
  justify-content: center;
  align-content: center;
`;

export const DetailsWrapper = styled.div`
  margin-top: -3vh;
  display: grid;
  width: 50%;
  grid-template-columns: 1fr 2fr;
  margin-bottom: 3vh;
  div:nth-child(4n),
  div:nth-child(4n + 3) {
    background-color: #e0e0e0;
  }
  @media (max-width: 640px) {
    width: 90%;
  }
`;

export const Details = styled.div`
  height: 5vh;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.title &&
    css`
      font-weight: 800;
    `}
`;
