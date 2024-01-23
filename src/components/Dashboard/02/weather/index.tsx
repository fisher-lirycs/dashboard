import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getWeek } from "../../../../utils/utils";
import Screen from "./screen";
import { KidsWeatherType, SensorsType } from "../../../../types/Types";
import axios from "axios";

const Weather: React.FC = () => {
    const weathery_name = "msp000969"
    const [weather, setWeather] = useState<KidsWeatherType>();
    const [tempSensor, setTempSensor] = useState<SensorsType>();
    const [windSensor, setWindSensor] = useState<SensorsType>();

    useEffect(() => {
        axios.get("https://t-api.kids-way.ne.jp/login/get_weathery_info?userid=esri&pass=esri1test1esri").then(({ data }) => {
            setWeather(data);
        }).catch(err => { throw (err) })
    }, [])

    useEffect(() => {
        if (weather) {
            if (weather.weathery_info) {
                for (const weatherInfo of weather.weathery_info) {
                    if (weatherInfo.initial_weathery_name === 'weathery_name'
                        && weatherInfo.sensors
                        && weatherInfo.sensors.length > 0) {
                        for (const sensor of weatherInfo.sensors) {
                            if (sensor.unit_id === "thermohygro") {
                                setTempSensor(sensor);
                            } else if (sensor.unit_id === "ws") {
                                setWindSensor(sensor)
                            }
                        }
                    }
                }
            }
        }
    }, [weather, weathery_name])

    const today = new Date();
    return (
        <Container>
            <TimeBlock>
                <span>{today.getFullYear()}年　{today.getMonth() + 1}月{today.getDate()}日（{getWeek(today.getDay())}）</span>
            </TimeBlock>
            <DateLine height="20%" style={{ display: "flex" }}>
                <Screen item="温度" value={tempSensor?.current.temp as string} unit="℃" />
                <Screen item="湿度" value={tempSensor?.current.humi as string} unit="％" />
                <Screen item="暑き指数" value={tempSensor?.current.wbgt as string} unit="℃" />
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