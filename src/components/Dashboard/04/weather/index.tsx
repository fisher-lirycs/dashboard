import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Screen from "./screen";
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
        <Container>
            <div style={{ width: "calc(100% - 20px)" }}>
                <Screen item="温度" value={tempSensor?.current.temp as number} unit="℃" />
            </div>
            <div style={{ width: "calc(100% - 20px)" }}>
                <Screen item="湿度" value={tempSensor?.current.humi as number} unit="％" />
            </div>
            <div style={{ width: "calc(100% - 20px)" }}>
                <Screen item="暑さ指数" value={tempSensor?.current.wbgt as number} unit="℃" />
            </div>
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    width: 100%;
`;

export default Weather;