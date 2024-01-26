import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { getWeek } from "../../../utils/utils";
import Weather from "./weather";
import Work from "./work";
import Notice from "./notice";
import Scroll from "./scroll";
import { KidsWeatherType, SensorsType } from "../../../types/Types";
import axios from "axios";
import { OpenWeatherType } from "../../../types/Types";

const DashBoard03: React.FC = () => {
    const day = new Date();
    const weathery_name = "msp000969"
    const [weather, setWeather] = useState<KidsWeatherType>();
    const [tempSensor, setTempSensor] = useState<SensorsType>();

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
                            }
                        }
                    }
                }
            }
        }
    }, [weather, weathery_name])

    const [weatherData, setWeatherData] = useState<{
        "yestoday": string;
        "today": string;
        "tomorrow": string;
    }>()

    useEffect(() => {
        axios.get("https://api.openweathermap.org/data/2.5/weather?lat=35.558751&lon=139.715263&units=metric&appid=2d6f72fd863d8dbb934d557c5009e646").then(({ data }) => {
            setWeatherData({
                "yestoday": data.weather[0].icon,
                "today": data.weather[0].icon,
                "tomorrow": data.weather[0].icon,
            });
        })
    }, []);

    return (
        <Container>
            <HeaderContent>
                <HeaderDateBlock>{day.getFullYear()}年{day.getMonth() + 1}月{day.getDate()}日 ({getWeek(day.getDay())})</HeaderDateBlock>
                <HeaderFlowBlock>
                    <Scroll text={"流れる文字流れる文字流れる文字流れる文字流れる文字流れる文字"} />
                </HeaderFlowBlock>
            </HeaderContent>
            <MainContent>
                <WeatherContent>
                    <WeatherImageBlock>
                        {weatherData && (<Weather type="image" title="天気" weather={weatherData}></Weather>)}
                    </WeatherImageBlock>
                    <WeatherNumberBlock>
                        <Weather type="number" title="温度" number={tempSensor?.current.temp as number} unit="℃"></Weather>
                    </WeatherNumberBlock>
                    <WeatherNumberBlock>
                        <Weather type="number" title="湿度" number={tempSensor?.current.humi as number} unit="%"></Weather>
                    </WeatherNumberBlock>
                    <WeatherNumberBlock>
                        <Weather type="number" title="暑さ指数" number={tempSensor?.current.wbgt as number} unit="℃"></Weather>
                    </WeatherNumberBlock>
                </WeatherContent>
                <WorkContent>
                    <Work />
                </WorkContent>
                <NoticeContent>
                    <Notice />
                </NoticeContent>
            </MainContent>
        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
    width: 100%;
    background-color: green;
`;

const HeaderContent = styled.div`
    position: relative;
    display: flex;
    width: calc(100% - 10px);
    height: 10%;
    align-items: center;
    padding: 5px;
`

const HeaderDateBlock = styled.div`
    position: relative;
    display: flex;
    height: 98%;
    width: 30%;
    align-items: center;
    justify-content: center;
    background-color: #366836;
    border-radius: 10px;
    font-size: 3vw;
    color: #fff;
`

const HeaderFlowBlock = styled.div`
    position: relative;
    display: flex;
    margin-left: 5px;
    height: 98%;
    width: calc(70% - 15px);
    padding: 0 10px;
    align-items: center;
    background-color: #366836;
    border-radius: 10px;
    font-size: 3vw;
    color: #e9d00c;
`

const MainContent = styled.div`
    position: relative;
    display: flex;
    width: calc(100% - 10px);
    height: calc(90% - 20px);
    align-items: center;
    padding: 5px;
`

const WeatherContent = styled.div`
    height: 100%;
    width: 25%;
    
`
const WeatherImageBlock = styled.div`
    weight: 100%;
    height: 31%;
`

const WeatherNumberBlock = styled.div`
    weight: 100%;
    height: 23%;
`

const WorkContent = styled.div`
    height: 100%;
    width: 38%;
    margin-left: 5px;
`

const NoticeContent = styled.div`
    height: 100%;
    width: calc(37% - 10px);
    margin-left: 5px;
`

export default DashBoard03