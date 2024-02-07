import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Screen from "./Screen";
import { KidsWeatherType, SensorsType } from "../../../../types/Types";
import axios from "axios";

const Weather: React.FC = () => {
    const weathery_name = "msp000969"

    const [apiTime, setApiTime] = useState<number>();
    useEffect(() => {
        if (localStorage.getItem("apiTime")) {
            const apiData: string = JSON.parse(localStorage.getItem("apiTime") || "5");
            const apiTimeSec = parseInt(apiData) * 1000;
            setApiTime(apiTimeSec);
        }
    }, [])

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
    }, [])

    useEffect(() => {
        const timerX = setInterval(getWeather, apiTime)
        return () => {
            clearInterval(timerX)
        }
    }, [apiTime])

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
        <WeatherContainer>
            <TempContent>
                <li>
                    <Screen item="温度" value={tempSensor?.current.temp as number} unit="℃" />
                </li>
                <li>
                    <Screen item="湿度" value={tempSensor?.current.humi as number} unit="％" />
                </li>
                <li>
                    <Screen item="暑さ指数" value={tempSensor?.current.wbgt as number} unit="℃" />
                </li>
            </TempContent>
            <WindContent>
                <li>
                    <Screen item="最大瞬間風速" value={windSensor?.current.inws as number} unit="m/sec" />

                </li>
                <li>
                    <Screen item="平均風速" value={windSensor?.current.avws as number} unit="m/sec" />
                </li>
            </WindContent>
        </WeatherContainer>
    )
}

const WeatherContainer = styled.div`
    position: relative;
    width: calc(100% - 10px);
    height: 100%;
    background-color: #000;
    padding: 5px;
`;

const TempContent = styled.ul`
    display: flex;
    width: 100%;
    height: calc(50% - 10px);
    margin: 0 0 10px 0;
    padding: 0;
    list-style: none;
    & li {
        width: 33%;
    }
    & li:not(:last-child) {
        margin-right: 1%;
    }
`

const WindContent = styled.ul`
    display: flex;
    width: 100%;
    height: 50%;
    margin: 0;
    padding: 0;
    list-style: none;
    & li {
        width: 49.5%;
    }
    & li:not(:last-child) {
        margin-right: 1%;
    }
`
export default Weather;