import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { getWeek } from "../../../../utils/utils";
import Screen from "./screen";
import { KidsWeatherType, SensorsType } from "../../../../types/Types";
import axios from "axios";
import Carama from "../camera";

const Weather: React.FC = () => {
    const weathery_name = "msp000969"

    const [weather, setWeather] = useState<KidsWeatherType>();
    const [tempSensor, setTempSensor] = useState<SensorsType>();
    const [windSensor, setWindSensor] = useState<SensorsType>();

    const getWeather = useCallback(() => {
        axios.get("https://o6qzaa6wj3fyhkhyugfpa6d4iq0frhoq.lambda-url.ap-northeast-1.on.aws/").then(({ data }) => {
            setWeather(data);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    useEffect(() => {
        getWeather();
        // const timerX = setInterval(getWeather, 10000)
        // return () => {
        //     clearInterval(timerX)
        // }
    }, [])

    useEffect(() => {
        if (weather) {
            if (weather.weathery_info) {
                for (const weatherInfo of weather.weathery_info) {
                    if (weatherInfo.initial_weathery_name === weathery_name
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
            <MiddleDateContent>
                <CameraBlock>
                    <Carama />
                </CameraBlock>
                <MiddleWeatherBlock>
                    <div style={{ height: "32%", width: "100%" }}>
                        <Screen item="温度" value={tempSensor?.current.temp as number} unit="℃" />
                    </div>
                    <div style={{ height: "32%", width: "100%", marginTop: "3%" }}>
                        <Screen item="湿度" value={tempSensor?.current.humi as number} unit="％" />
                    </div>
                    <div style={{ height: "32%", width: "100%", marginTop: "3%" }}>
                        <Screen item="暑さ指数" value={tempSensor?.current.wbgt as number} unit="℃" />
                    </div>
                </MiddleWeatherBlock>
            </MiddleDateContent>
            <BottomDateContent>
                <Screen item="最大瞬間風速" width="100%" value={windSensor?.current.inws as number} unit="m/sec" />
                <Screen item="平均風速" width="100%" value={windSensor?.current.avws as number} unit="m/sec" />
            </BottomDateContent>
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

const MiddleDateContent = styled.div`
    display: flex;
    height: 65%;
    width: 100%;
`

const CameraBlock = styled.div`
    height: 100%;
    width: 50%;
    margin-left: 1%;
`


const MiddleWeatherBlock = styled.div`
    height: 100%;
    width: 33%;
    margin-left: 1%;
`

const BottomDateContent = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 20%;
    margin-top: 2%;
`


export default Weather;