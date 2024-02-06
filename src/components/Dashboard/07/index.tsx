import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Rnd } from "react-rnd";
import Header from "./Header";
import Circle from "./Circle";
import Reserve from "./Reserve";

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
        }
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
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;
`

export default Dashboard07;