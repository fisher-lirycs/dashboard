import React from "react";
import styled from "styled-components";
import { getWeek } from "../../../../utils/utils";
import Screen from "./screen";
import Compass from "./compass";

const Weather: React.FC = () => {
    const today = new Date();
    return (
        <Container>
            <TimeBlock>
                <span>{today.getFullYear()}年　{today.getMonth() + 1}月{today.getDate()}日（{getWeek(today.getDay())}）</span>
            </TimeBlock>
            <DateLine height="20%" style={{ display: "flex" }}>
                <Screen item="温度" value="30.4" unit="℃" />
                <Screen item="湿度" value="60.0" unit="℃" />
                <Screen item="暑き指数" value="26℃/警戒" unit="" />
            </DateLine>
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    width: 98%;
    height: 80%;
    background-color: #000000;
    padding: 10px;
`;

const TimeBlock = styled.div`
    height: 10%;
    padding-left: 10px;
    color: #ffffff;
    font-size: 1.5vw;
`

const DateLine = styled.div<{ height: string, width?: string }>`
    position: relative;
    top: 70%;
    width:  ${props => props.width || "100%"};
    height: ${props => props.height};
`


export default Weather;