import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Rnd } from "react-rnd";
import Header from "./Header";
import Circle from "./Circle";
import Reserve from "./Reserve";
import CameraAndWeather from "./CameraAndWeather";
import Safety from "./Safety";
import Rule from "./Rule";

const Dashboard07: React.FC = () => {
    const [screenHeight, setScreenHeight] = useState(window.innerHeight - 120);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth - 30);
    const [sliderStatus, setSliderStatus] = useState(false);

    const layout = {
        "Circle": {
            x: 10,
            y: 90,
            width: screenWidth / 4,
            height: screenHeight / 2
        },
        "Schedule": {
            x: 10,
            y: 90 + screenHeight / 2,
            width: screenWidth / 4,
            height: screenHeight / 2
        },
        "CameraAndWeather": {
            x: screenWidth / 4 + 20,
            y: 90,
            width: screenWidth / 2 - 10,
            height: screenHeight - 10
        },
        "Safety": {
            x: screenWidth / 4 * 3 + 20,
            y: 90,
            width: screenWidth / 4,
            height: screenHeight / 3,
        },
        "Rule": {
            x: screenWidth / 4 * 3 + 20,
            y: screenHeight / 3 + 100,
            width: screenWidth / 4,
            height: screenHeight / 3 * 2,
        },
    }

    return (
        <Container>
            <Header />
            <Rnd default={layout["Circle"]}>
                <Circle />
            </Rnd>
            <Rnd default={layout["Schedule"]}>
                <Reserve />
            </Rnd>
            <Rnd default={layout["CameraAndWeather"]}>
                <CameraAndWeather />
            </Rnd>
            <Rnd default={layout["Safety"]}>
                <Safety />
            </Rnd>
            <Rnd default={layout["Rule"]}>
                <Rule />
            </Rnd>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;
`

export default Dashboard07;