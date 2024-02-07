import React, { useState } from "react";
import styled from "styled-components";
import { Rnd } from "react-rnd";
import Header from "./Header";
import Circle from "./Circle";
import Reserve from "./Reserve";
import Camera from "./Camera";
import Weather from "./Weather";
import Safety from "./Safety";
import Rule from "./Rule";
import Crane from "./Crane";
import Slider from "./Slide";
import { ReactComponent as PlayImage } from "./../../../assets/images/play.svg";

const Dashboard07: React.FC = () => {
  const [screenHeight] = useState(window.innerHeight - 120);
  const [screenWidth] = useState(window.innerWidth - 30);
  const [sliderStatus, setSliderStatus] = useState(false);

  const layout = {
    Play: {
      x: screenWidth - 100,
      y: 20,
      width: 80,
      height: 40,
    },
    Circle: {
      x: 10,
      y: 90,
      width: screenWidth / 4,
      height: screenHeight / 2,
    },
    Schedule: {
      x: 10,
      y: 90 + screenHeight / 2,
      width: screenWidth / 4,
      height: screenHeight / 2,
    },
    Camera: {
      x: screenWidth / 4 + 20,
      y: 90,
      width: screenWidth / 2 - 10,
      height: screenHeight / 3 * 2,
    },
    Weather: {
      x: screenWidth / 4 + 20,
      y: screenHeight / 3 * 2 + 90,
      width: screenWidth / 2 - 10,
      height: screenHeight / 3,
    },
    Safety: {
      x: (screenWidth / 4) * 3 + 20,
      y: 90,
      width: screenWidth / 4,
      height: screenHeight / 4,
    },
    Rule: {
      x: (screenWidth / 4) * 3 + 20,
      y: screenHeight / 4 + 90,
      width: screenWidth / 4,
      height: (screenHeight / 4),
    },
    Crane: {
      x: (screenWidth / 4) * 3 + 20,
      y: screenHeight / 2 + 110,
      width: screenWidth / 4,
      height: (screenHeight / 2),
    },
  };

  return (
    <Container>
      <Header />
      <Rnd default={layout["Play"]}>
        <PlayButton onClick={() => setSliderStatus(!sliderStatus)}>
          <PlayImage width={"100%"} height={"100%"} />
        </PlayButton>
      </Rnd>
      <Rnd default={layout["Circle"]}>
        <Circle />
      </Rnd>
      <Rnd default={layout["Schedule"]}>
        <Reserve />
      </Rnd>
      <Rnd default={layout["Camera"]}>
        <Camera />
      </Rnd>
      <Rnd default={layout["Weather"]}>
        <Weather />
      </Rnd>
      <Rnd default={layout["Safety"]}>
        <Safety />
      </Rnd>
      <Rnd default={layout["Rule"]}>
        <Rule />
      </Rnd>
      <Rnd default={layout["Crane"]}>
        <Crane />
      </Rnd>
      {sliderStatus && (
        <Slider status={sliderStatus} setStatus={setSliderStatus} />
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const PlayButton = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

export default Dashboard07;
