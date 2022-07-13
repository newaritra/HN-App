import React from "react";
import styled, { keyframes } from "styled-components";

const animate = keyframes`
from{transform:translateX(-50%);
    background:black;
}
50%{transform:translateX(2rem);background:gray;}
to{transform:translateX(-50%);background:black;}
`;
const SpinnerLoader = styled.div`
  width: 3rem;
  background-color: black;
  height: 3rem;
  position: fixed;
  margin: 25% 0 0 50%;
  /* transform: translate(-100%, -500%); */
  animation-name: ${animate};
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  @media (max-width: 600px) {
    margin: 70% 0 0 50%;
  }
`;

const Spinner = () => {
  return <SpinnerLoader />;
};

export default Spinner;
