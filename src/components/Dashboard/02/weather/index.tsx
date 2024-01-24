import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getWeek } from "../../../../utils/utils";
import Screen from "./screen";
import { KidsWeatherType, SensorsType } from "../../../../types/Types";
import axios from "axios";

const Weather: React.FC = () => {
    const weathery_name = "msp000969"
    const { getCameraUrl } = window;

    const [weather, setWeather] = useState<KidsWeatherType>();
    const [tempSensor, setTempSensor] = useState<SensorsType>();
    const [windSensor, setWindSensor] = useState<SensorsType>();
    const [cameraUrl, setCameraUrl] = useState("");

    useEffect(() => {
        getCameraUrl("exlnk-eJym4WXfkzLm", "UD&hNcC(g5-m", "1503-5254-4767-2882").then(data => {
            let url = data.url;
            let qs = "aspect_ratio=16_9&";
            qs += "pause_resume_enable=enable";
            setCameraUrl(url + "?" + qs)
        }).catch(error => {
            console.log(error);
        })
    }, [getCameraUrl])

    useEffect(() => {
        axios.get("https://t-api.kids-way.ne.jp/login/get_weathery_info?userid=esri&pass=esri1test1esri").then(({ data }) => {
            setWeather(data);
        }).catch(error => {
            console.log(error);
        })
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
            <MiddleDateContent>
                <CameraBlock>
                    <CameraIframe id="cameraIframe" src={cameraUrl}></CameraIframe>
                </CameraBlock>
                <MiddleWeatherBlock>
                    <div style={{ height: "32%", width: "100%" }}>
                        <Screen item="温度" value={tempSensor?.current.temp as string} unit="℃" />
                    </div>
                    <div style={{ height: "32%", width: "100%", marginTop: "2%" }}>
                        <Screen item="湿度" value={tempSensor?.current.humi as string} unit="％" />
                    </div>
                    <div style={{ height: "32%", width: "100%", marginTop: "2%" }}>
                        <Screen item="暑き指数" value={tempSensor?.current.wbgt as string} unit="℃" />
                    </div>
                </MiddleWeatherBlock>
            </MiddleDateContent>
            <BottomDateContent>
                <Screen item="最大瞬間風速" width="100%" value={tempSensor?.current.temp as string} unit="m/sec" />
                <Screen item="平均風速" width="100%" value={tempSensor?.current.humi as string} unit="m/sec" />
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
    width: 66%;
    margin-left: 1%;
`

const CameraIframe = styled.iframe`
    height: 100%;
    width: 100%;
    border: 1px solid silver;
    border-radius: 5px;
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