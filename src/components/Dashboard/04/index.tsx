import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Rnd } from "react-rnd";
import ClockAndPie from "./clockpie";
import Carama from "./camera";
import Work from "./work";
import { PieType } from "../../../types/Types";
import axios from "axios";
import { KidsWeatherType, SensorsType } from "../../../types/Types";
import Screen from "./weather/screen";
import { ReactComponent as PlayImage } from "./../../../assets/images/play.svg";
import Slider from "./slider";

const Dashboard04: React.FC = () => {
    const [screenHeight, setScreenHeight] = useState(window.innerHeight - 30);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth - 30);
    const [sliderStatus, setSliderStatus] = useState(false);

    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const data: Array<PieType> = [
        { value: 735, name: 'A', color: "red" },
        { value: 510, name: 'B', color: "orange" },
        { value: 434, name: 'C', color: "pink" },
        { value: 335, name: 'D', color: "yellow" }
    ];

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
            <Rnd default={{ x: 10, y: 20, width: screenWidth / 3, height: screenHeight / 2, }}>
                <ContainerLeftTop>
                    <ClockAndPie width={"75%"} pieData={data} time={time} borderColor="silver" />
                </ContainerLeftTop>
            </Rnd>
            <Rnd default={{ x: 10, y: screenHeight / 2 + 20, width: screenWidth / 3, height: screenHeight / 2 }}>
                <ContaineLeftBottom>
                    <Work />
                </ContaineLeftBottom>
            </Rnd>
            <Rnd default={{ x: screenWidth / 3 + 20, y: 20, width: screenWidth / 3, height: screenHeight - 105, }}>
                <ContaineMiddleTop>
                    <Carama />
                </ContaineMiddleTop>
            </Rnd>
            <Rnd default={{ x: screenWidth / 2 - 20, y: screenHeight - 80, width: 80, height: 80, }}>
                <ContaineMiddleBottom onClick={() => setSliderStatus(!sliderStatus)}>
                    <PlayImage width={"100%"} height={"100%"} />
                </ContaineMiddleBottom>
            </Rnd>
            <Rnd default={{ x: screenWidth / 3 * 2 + 25, y: 30, width: screenWidth / 3 - 20, height: 80 }}>
                <ContaineRight>
                    <Screen item="温度" value={tempSensor?.current.temp as number} unit="℃" />
                </ContaineRight>
            </Rnd>
            <Rnd default={{ x: screenWidth / 3 * 2 + 25, y: 155, width: screenWidth / 3 - 20, height: 80 }}>
                <ContaineRight>
                    <Screen item="湿度" value={tempSensor?.current.humi as number} unit="％" />
                </ContaineRight>
            </Rnd>
            <Rnd default={{ x: screenWidth / 3 * 2 + 25, y: 285, width: screenWidth / 3 - 20, height: 80 }}>
                <ContaineRight>
                    <Screen item="暑さ指数" value={tempSensor?.current.wbgt as number} unit="℃" />
                </ContaineRight>
            </Rnd>
            <Rnd default={{ x: screenWidth / 3 * 2 + 25, y: 415, width: screenWidth / 3 - 20, height: 80 }}>
                <ContaineRight>
                    <Screen item="最大瞬間風速" value={windSensor?.current.inws as number} unit="m/sec" />
                </ContaineRight>
            </Rnd>
            <Rnd default={{ x: screenWidth / 3 * 2 + 25, y: 545, width: screenWidth / 3 - 20, height: 80 }}>
                <ContaineRight>
                    <Screen item="平均風速" value={windSensor?.current.avws as number} unit="m/sec" />
                </ContaineRight>
            </Rnd>
            {sliderStatus && <Slider status={sliderStatus} setStatus={setSliderStatus} pieData={data} time={time} borderColor="silver" />}
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;
`
const ContainerLeftTop = styled.div`
    display:flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background-color: #366836;
`
const ContaineLeftBottom = styled.div`
    display:flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    border-radius: 10px;
`
const ContaineMiddleTop = styled.div`
    display:flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background-color: #366836;
`

const ContaineMiddleBottom = styled.div`
    display:flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    cursor: pointer;
`

const ContaineRight = styled.div`
    display:flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
`

export default Dashboard04;