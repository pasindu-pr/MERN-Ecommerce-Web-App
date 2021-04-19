import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import styled from "styled-components";

const LoadingComponent = () => {
  return (
    <>
      <MainContainer>
        <Loader type="Oval" color="#f2a154" height={35} width={35} />
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 90vh;
`;

export default LoadingComponent;
