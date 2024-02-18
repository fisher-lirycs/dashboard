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
import { ReactComponent as SettingImage } from "./../../../assets/images/setting.svg";
import { ReactComponent as ResetImage } from "./../../../assets/images/reset.svg";
import { Link } from "react-router-dom";
import { LayoutType } from "../../../types/Types";

const Dashboard07: React.FC = () => {
  const [screenHeight] = useState(window.innerHeight - 120);
  const [screenWidth] = useState(window.innerWidth - 30);
  const [sliderStatus, setSliderStatus] = useState(false);

  const layoutDefaultData: LayoutType = {
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
      height: (screenHeight / 3) * 2,
    },
    Weather: {
      x: screenWidth / 4 + 20,
      y: (screenHeight / 3) * 2 + 90,
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
      height: screenHeight / 4,
    },
    Crane: {
      x: (screenWidth / 4) * 3 + 20,
      y: screenHeight / 2 + 110,
      width: screenWidth / 4,
      height: screenHeight / 2,
    },
  };

  const [layout] = useState<LayoutType>(
    JSON.parse(localStorage.getItem("layoutData") as string) ||
      layoutDefaultData
  );

  const handlerLayout = (
    id: string,
    kbn: "drag" | "resize",
    x: number,
    y: number,
    width?: number,
    height?: number
  ) => {
    let tempLayoutData: LayoutType = JSON.parse(
      localStorage.getItem("layoutData") || JSON.stringify(layout)
    );

    if (kbn === "drag") {
      tempLayoutData[id].x = x;
      tempLayoutData[id].y = y;
    } else if (kbn === "resize") {
      tempLayoutData[id].x = x;
      tempLayoutData[id].y = y;
      tempLayoutData[id].width = width as number;
      tempLayoutData[id].height = height as number;
    }
    // localStorage.setItem("layoutData", JSON.stringify(tempLayoutData));
  };

  const resetLayout = () => {
    localStorage.setItem("layoutData", JSON.stringify(layoutDefaultData));
    window.location.reload();
  };

  return (
    <Container>
      <Header />
      <ResetButton style={{ display: "none" }}>
        <ResetImage width={"100%"} height={"100%"} onClick={resetLayout} />
      </ResetButton>
      <Rnd
        default={layout["Play"]}
        onDragStop={(e, d) => {
          handlerLayout("Play", "drag", d.x, d.y);
        }}
        onResize={(e, direction, ref, delta, position) => {
          handlerLayout(
            "Play",
            "resize",
            position.x,
            position.y,
            ref.offsetWidth,
            ref.offsetHeight
          );
        }}
      >
        <PlayButton>
          <div>
            <PlayImage
              width={"100%"}
              height={"100%"}
              onClick={() => setSliderStatus(!sliderStatus)}
            />
          </div>
          <div>
            <Link to="/setting">
              <SettingImage width={"100%"} height={"100%"} />
            </Link>
          </div>
        </PlayButton>
      </Rnd>
      <Rnd
        default={layout["Circle"]}
        onDragStop={(e, d) => {
          handlerLayout("Circle", "drag", d.x, d.y);
        }}
        onResize={(e, direction, ref, delta, position) => {
          handlerLayout(
            "Circle",
            "resize",
            position.x,
            position.y,
            ref.offsetWidth,
            ref.offsetHeight
          );
        }}
      >
        <Circle />
      </Rnd>
      <Rnd
        default={layout["Schedule"]}
        onDragStop={(e, d) => {
          handlerLayout("Schedule", "drag", d.x, d.y);
        }}
        onResize={(e, direction, ref, delta, position) => {
          handlerLayout(
            "Schedule",
            "resize",
            position.x,
            position.y,
            ref.offsetWidth,
            ref.offsetHeight
          );
        }}
      >
        <Reserve />
      </Rnd>
      <Rnd
        default={layout["Camera"]}
        onDragStop={(e, d) => {
          handlerLayout("Camera", "drag", d.x, d.y);
        }}
        onResize={(e, direction, ref, delta, position) => {
          handlerLayout(
            "Camera",
            "resize",
            position.x,
            position.y,
            ref.offsetWidth,
            ref.offsetHeight
          );
        }}
      >
        <Camera />
      </Rnd>
      <Rnd
        default={layout["Weather"]}
        onDragStop={(e, d) => {
          handlerLayout("Weather", "drag", d.x, d.y);
        }}
        onResize={(e, direction, ref, delta, position) => {
          handlerLayout(
            "Weather",
            "resize",
            position.x,
            position.y,
            ref.offsetWidth,
            ref.offsetHeight
          );
        }}
      >
        <Weather />
      </Rnd>
      <Rnd
        default={layout["Safety"]}
        onDragStop={(e, d) => {
          handlerLayout("Safety", "drag", d.x, d.y);
        }}
        onResize={(e, direction, ref, delta, position) => {
          handlerLayout(
            "Safety",
            "resize",
            position.x,
            position.y,
            ref.offsetWidth,
            ref.offsetHeight
          );
        }}
      >
        <Safety />
      </Rnd>
      <Rnd
        default={layout["Rule"]}
        onDragStop={(e, d) => {
          handlerLayout("Rule", "drag", d.x, d.y);
        }}
        onResize={(e, direction, ref, delta, position) => {
          handlerLayout(
            "Rule",
            "resize",
            position.x,
            position.y,
            ref.offsetWidth,
            ref.offsetHeight
          );
        }}
      >
        <Rule />
      </Rnd>
      <Rnd
        default={layout["Crane"]}
        onDragStop={(e, d) => {
          handlerLayout("Crane", "drag", d.x, d.y);
        }}
        onResize={(e, direction, ref, delta, position) => {
          handlerLayout(
            "Crane",
            "resize",
            position.x,
            position.y,
            ref.offsetWidth,
            ref.offsetHeight
          );
        }}
      >
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
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;

  & svg {
    cursor: pointer;
  }
`;

const ResetButton = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  cursor: pointer;
`;

export default Dashboard07;
