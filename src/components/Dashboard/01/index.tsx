import React from "react";
import styled from "styled-components";
import { getWeek } from "../../../utils/utils";
import { WeatherType } from "../../../types/Types";
import Weather from "./weather";


export interface DashboardProps {
    weather?: WeatherType;
    children?: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ weather, children }) => {
    const day = new Date();
    return (
        <Body>
            <Header>
                <Day>{day.getMonth() + 1}/{day.getDate()} ({getWeek(day.getDay())})</Day>
                <Title>作業員の皆様へ</Title>
            </Header>
            <Container>
                <WeatherContainer>
                    <WeatherBlock>
                        <Weather title="今日の天気" kubun="image" icon={weather?.weather[0].icon} time="Today" />
                    </WeatherBlock>
                    <WeatherBlock>
                        <Weather title="最高気温" kubun="number" val={weather?.main.temp} type="temp" />
                    </WeatherBlock>
                    <WeatherBlock>
                        <Weather title="降水確率" kubun="number" val={weather?.main.humidity} type="rain" />
                    </WeatherBlock>
                    <WeatherBlock>
                        <Weather title="明日の天気" kubun="image" icon={weather?.weather[0].icon} time="Tomorrow" />
                    </WeatherBlock>
                </WeatherContainer>
                <div>
                </div>
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
    font-size: 20px;
    font-weight: bold;
    color: #ffffff;
`;

const Day = styled.div`
    margin-right: 100px;
    font-size: 18px;
    font-weight: bold;
    color: #ffffff;
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



export default Dashboard;