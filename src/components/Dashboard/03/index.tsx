import React from "react";
import styled from "styled-components";
import { getWeek } from "../../../utils/utils";
import Weather from "./weather";
import Work from "./work";
import Notice from "./notice";
import Scroll from "./scroll";

const DashBoard03: React.FC = () => {
    const day = new Date();
    const weatherData = {
        "yestoday": "01d",
        "today": "03d",
        "tomorrow": "10d",
    }
    return (
        <Container>
            <HeaderContent>
                <HeaderDateBlock>{day.getFullYear()}年{day.getMonth() + 1}月{day.getDate()}日 ({getWeek(day.getDay())})</HeaderDateBlock>
                <HeaderFlowBlock>
                    <Scroll text={"流れる文字"}/>
                </HeaderFlowBlock>
            </HeaderContent>
            <MainContent>
                <WeatherContent>
                    <WeatherImageBlock>
                        <Weather type="image" title="天気" weather={weatherData}></Weather>
                    </WeatherImageBlock>
                    <WeatherNumberBlock>
                        <Weather type="number" title="降水確率" number="50" unit="%"></Weather>
                    </WeatherNumberBlock>
                    <WeatherNumberBlock>
                        <Weather type="number" title="気温" number="17.5" unit="℃"></Weather>
                    </WeatherNumberBlock>
                    <WeatherNumberBlock>
                        <Weather type="number" title="湿度" number="50" unit="%"></Weather>
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