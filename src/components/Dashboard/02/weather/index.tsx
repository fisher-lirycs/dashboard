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
            <DateLine height="48%">
                <div style={{ float: "left", width: "65%" , height: "90%" }}>
                    <DateLine height="46%">
                        <Screen size="large" item="平均風速" value="0.7" unit="m/sec" />
                    </DateLine>
                    <DateLine height="46%">
                        <Screen size="large" item="瞬間風速" value="0.1" unit="m/sec" />
                    </DateLine>
                </div>
                <div style={{ float: "right", width: "30%", height: "95%" }}>
                    <DateLine height="92%" >
                        <Compass direction="SE" />
                    </DateLine>
                </div>
            </DateLine>
            <DateLine height="20%" style={{ display: "flex" }}>
                <Screen item="温度" value="30.4" unit="℃" />
                <Screen item="湿度" value="60.0" unit="℃" />
                <Screen item="暑き指数" value="26℃/警戒" unit="" />
            </DateLine>
            <DateLine height="20%" style={{ display: "flex" }}>
                <Screen item="1時間雨量" value="0.0" unit="mm" />
                <Screen item="24時間雨量" value="0.0" unit="mm" />
                <Screen item="降り始め雨量" value="0.0" unit="mm" />
            </DateLine>
        </Container>
    )
}

const Container = styled.div`
    width: 98%;
    height: 75%;
    background-color: #000000;
    padding: 10px;
`;

const TimeBlock = styled.div`
    height: 20px;
    padding-left: 10px;
    color: #ffffff;
`

const DateLine = styled.div<{ height: string, width?: string }>`
    width:  ${props => props.width || "100%"};
    height: ${props => props.height};
    padding-top: 10px;
`


export default Weather;