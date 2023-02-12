import React from "react";
import ContentLoader from "react-content-loader";

const MyAccountLoader = () => (
  <ContentLoader
    speed={3}
    width={`40vw`}
    height={`15vh`}
    backgroundColor="#eaeced"
    foregroundColor="#ffffff"
  >
    <rect x="0" y="1vh" rx="1" ry="1" width="0.3vw" height="5vh" />
    <rect x="39.7vw" y="1vh" rx="1" ry="1" width="0.3vw" height="5vh" />
    <rect x="0" y="7.2vh" rx="1" ry="1" width="0.3vw" height="5vh" />
    <rect x="39.7vw" y="7.2vh" rx="1" ry="1" width="0.3vw" height="5vh" />

    <rect x="19.7vw" y="1vh" rx="1" ry="1" width="0.3vw" height="5vh" />
    <rect x="19.7vw" y="7.2vh" rx="1" ry="1" width="0.3vw" height="5vh" />

    <rect x="0" y="1vh" rx="1" ry="1" width="40vw" height="0.2vh" />
    <rect x="1vw" y="2.8vh" rx="5" ry="5" width="18vw" height="2vh" />
    <rect x="21vw" y="2.8vh" rx="5" ry="5" width="18vw" height="2vh" />
    <rect x="0" y="6vh" rx="1" ry="1" width="40vw" height="0.2vh" />

    <rect x="0" y="7.2vh" rx="1" ry="1" width="40vw" height="0.2vh" />
    <rect x="1vw" y="9vh" rx="5" ry="5" width="18vw" height="2vh" />
    <rect x="21vw" y="9vh" rx="5" ry="5" width="18vw" height="2vh" />
    <rect x="0" y="12.2vh" rx="1" ry="1" width="40vw" height="0.2vh" />
  </ContentLoader>
);

export default MyAccountLoader;
