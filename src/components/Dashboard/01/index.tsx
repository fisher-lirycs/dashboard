import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { getWeek } from "../../../utils/utils";
import Weather from "./weather";
import Workflow from "./workflow";
import Notice from "./notice";
import axios from "axios";
import { KidsWeatherType, SensorsType } from "../../../types/Types";

export interface DashboardProps {
    children?: React.ReactNode;
}

const DashBoard01: React.FC<DashboardProps> = () => {
    const day = new Date();

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
        const timerX = setInterval(getWeather, 10000)
        return () => {
            clearInterval(timerX)
        }
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

    return (
        <Body>
            <Header>
                <Day>{day.getMonth() + 1}/{day.getDate()} ({getWeek(day.getDay())})</Day>
                <Title>作業員の皆様へ</Title>
            </Header>
            <Container>
                <WeatherContainer>
                    <WeatherBlock>
                        <Weather title="今日の天気" kubun="image" icon={"03d"} timer="Today" />
                    </WeatherBlock>
                    <WeatherBlock>
                        <Weather title="温度" kubun="number" val={tempSensor?.current.temp} type="temp" />
                    </WeatherBlock>
                    <WeatherBlock>
                        <Weather title="湿度" kubun="number" val={tempSensor?.current.humi} type="humi" />
                    </WeatherBlock>
                    <WeatherBlock>
                        <Weather title="明日の天気" kubun="image" icon={"10d"} timer="Tomorrow" />
                    </WeatherBlock>
                </WeatherContainer>
                <WorkContainer>
                    <WeatherForcastBlock>
                        <span>気象情報：注意報が流れます</span>
                    </WeatherForcastBlock>
                    <WorkBlock>
                        <WorkflowBlock><Workflow /></WorkflowBlock>
                        <NoticeBlock><Notice /></NoticeBlock>
                    </WorkBlock>
                </WorkContainer>
            </Container>
        </Body>
    )
}

const Body = styled.div`
    position: absolute;
    width: 100%;
    background-color: #009688;
    color: #ffffff;
`;

const Header = styled.div`
    display:flex;
    height: 68px;
    padding: 0 20px;
    align-items: center;
    border-bottom: solid 2px #ffffff;
`;

const Title = styled.div`
    font-size: 40px;
`;

const Day = styled.div`
    margin-right: 100px;
    font-size: 18px;
    font-weight: bold;
`;

const Container = styled.div`
    display: flex;
    height: calc(100vh - 70px);
`;

const WeatherContainer = styled.div`
    height: 100%;
    width: 20%;
    border-right: solid 2px #ffffff;
`;

const WeatherBlock = styled.div`
    height: 22%;
    width: 100%;
    padding-top:10px;
`;

const WorkContainer = styled.div`
    width: 80%;
`;

const WeatherForcastBlock = styled.div`
    display: flex;
    height: 50px;
    width: 100%;
    align-items: center;
    border-bottom: solid 2px #ffffff;
    font-size: 30px;

    & > span {
        margin-left: 20px;
    }
`;

const WorkBlock = styled.div`
    height: calc(100% - 72px);
`

const WorkflowBlock = styled.div`
    float: left;
    width: 50%;
    height: 100%;
    padding: 10px;
    text-align: center;
`

const NoticeBlock = styled.div`
    float: right;
    width: 45%;
    height: 100%;
    padding: 10px;
    text-align: center;
`


export default DashBoard01;