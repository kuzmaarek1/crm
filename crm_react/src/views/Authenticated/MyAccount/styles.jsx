import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #616161;
  background-color: #f7f8fc;
  height: 92.5vh;
  width: 100%;
`;

export const ButtonWrapper = styled.div`
  width: ${({ small }) => (small ? "200px" : "500px")};
  display: flex;
  gap: 5px;
  justify-content: center;
  align-content: center;
`;

export const DetailsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 1px;
  margin-bottom: 3vh;
`;

export const Details = styled.div`
  margin-top: 1vh;
  height: 5vh;
  width: 100%;
  text-align: center;
  line-height: 5vh;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  ${(props) =>
    props.title &&
    css`
      font-weight: 800;
    `}
`;
