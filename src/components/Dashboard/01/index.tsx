import React from "react";
import styled from "styled-components";
import { getWeek } from "../../../utils/utils";
import { Weather } from "../../../types/Types";


export interface DashboardProps {
    weather?: Weather;
    screenH: number;
    children?: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ weather, screenH, children }) => {
    const day = new Date();
    return (
        <Body height={screenH}>
            <Header>
                <Day>{day.getMonth() + 1}/{day.getDate()} ({getWeek(day.getDay())})</Day>
                <Title>作業員の皆さんへ</Title>
            </Header>
        </Body>
    )
}

const Body = styled.div<{ height: number; }>`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #009688;
    color: #ffffff;
`;

const Header = styled.div`
    display:flex;
    height: 50px;
    padding: 10px 20px;
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


export default Dashboard;