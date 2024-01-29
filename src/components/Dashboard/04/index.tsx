import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Rnd } from "react-rnd";
import Carama from "./camera";

const Dashboard04: React.FC = () => {
    const [screenHeight, setScreenHeight] = useState(window.innerHeight - 10);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth - 10);

    return (
        <Container>
            <Rnd
                default={{
                    x: 0,
                    y: 0,
                    width: screenWidth / 2,
                    height: screenHeight
                }}
            >
                <ContainerLeft>
                    <Carama />
                </ContainerLeft>
            </Rnd>
            <Rnd
                default={{
                    x: screenWidth / 2,
                    y: 0,
                    width: screenWidth / 2,
                    height: screenHeight / 2
                }}
            >
                <ContaineRightTop></ContaineRightTop>
            </Rnd>
            <Rnd
                default={{
                    x: screenWidth / 2,
                    y: screenHeight / 2,
                    width: screenWidth / 2,
                    height: screenHeight / 2
                }}
            >
                <ContaineRightBottom>
                </ContaineRightBottom>
            </Rnd>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;
`

const ContainerLeft = styled.div`
    width: 100%;
    height: 100%;
    background-color: green;
`

const ContaineRightTop = styled.div`
    width: 100%;
    height: 100%;
    background-color: blue;
`

const ContaineRightBottom = styled.div`
    width: 100%;
    height: 100%;
    background-color: green;
`


export default Dashboard04;