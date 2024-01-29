import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Rnd } from "react-rnd";
import Carama from "./camera";
import Work from "./work";
import Weather from "./weather";

const Dashboard04: React.FC = () => {
    const [screenHeight, setScreenHeight] = useState(window.innerHeight - 30);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth - 30);

    return (
        <Container>
            <Rnd
                default={{
                    x: 10,
                    y: 20,
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
                    x: screenWidth / 2 + 20,
                    y: 10,
                    width: screenWidth / 2,
                    height: screenHeight / 2
                }}
            >
                <ContaineRightTop>
                    <Work />
                </ContaineRightTop>
            </Rnd>
            <Rnd
                default={{
                    x: screenWidth / 2 + 20,
                    y: screenHeight / 2 + 50,
                    width: screenWidth / 2,
                    height: screenHeight / 2 - 30
                }}
            >
                <ContaineRightBottom>
                    <Weather />
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
    display:flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background-color: #366836;
`

const ContaineRightTop = styled.div`
    display:flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    border-radius: 10px;
`

const ContaineRightBottom = styled.div`
    display:flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
`


export default Dashboard04;