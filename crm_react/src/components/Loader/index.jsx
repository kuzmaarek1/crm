import React from "react";
import * as Styles from "./styles";

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const loadingCircleVariants = {
  start: {
    y: "0%",
  },
  end: {
    y: "50%",
  },
};
const loadingCircleTransition = {
  duration: 0.5,
  repeat: Infinity,
  repeatType: "reverse",
  ease: "easeInOut",
};

const Loader = () => {
  return (
    <Styles.Wrapper>
      <Styles.LoadingContainer
        variants={loadingContainerVariants}
        initial="start"
        animate="end"
      >
        {[...Array(3).keys()].map((i) => (
          <Styles.LoadingCircle
            key={i}
            variants={loadingCircleVariants}
            transition={loadingCircleTransition}
          ></Styles.LoadingCircle>
        ))}
      </Styles.LoadingContainer>
    </Styles.Wrapper>
  );
};

export default Loader;
