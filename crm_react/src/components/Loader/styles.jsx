import styled from "styled-components";
import { motion } from "framer-motion";

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
`;

export const LoadingContainer = styled(motion.div)`
  width: 7vw;
  height: 3vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const LoadingCircle = styled(motion.span)`
  display: block;
  width: 13px;
  height: 13px;
  background-color: rgba(112, 112, 112, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.darkGrey};
  border-radius: 0.5rem;
`;
