import React from "react";
import styled from "styled-components";
import { getWeek } from "../../../utils/utils";
import { WeatherType } from "../../../types/Types";
import Weather from "./weather";
import Workflow from "./workflow";
import Notice from "./notice";


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
                        <Weather title="今日の天気" kubun="image" icon={weather?.weather[0].icon} timer="Today" />
                    </WeatherBlock>
                    <WeatherBlock>
                        <Weather title="最高気温" kubun="number" val={weather?.main.temp} type="temp" />
                    </WeatherBlock>
                    <WeatherBlock>
                        <Weather title="降水確率" kubun="number" val={weather?.main.humidity} type="rain" />
                    </WeatherBlock>
                    <WeatherBlock>
                        <Weather title="明日の天気" kubun="image" icon={weather?.weather[0].icon} timer="Tomorrow" />
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


export default Dashboard;