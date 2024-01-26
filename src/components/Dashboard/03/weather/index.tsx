import React from "react";
import styled from "styled-components";
import { IconTypes, WeatherIconMap } from "../../../../constant/Icon";
import Icon from "../../../Icon/Icon";

export type WeatherProps = {
    type: "image"
    title: string;
    weather: {
        "yestoday": string;
        "today": string;
        "tomorrow": string;
    }
} | {
    type: "number"
    title: string;
    number: number;
    unit: string;
}

const Weather: React.FC<WeatherProps> = (props) => {
    return (
        <Container>
            <TitleContent>{props.title}</TitleContent>
            <>
                {props.type === "image" ? (
                    <ImageBlock>
                        <div style={{ width: "100%", height: "70%", display: "flex" }}>
                            <Image day="yestoday">
                                <Icon name={WeatherIconMap[props.weather.yestoday] as IconTypes} width={"70%"} height={"70%"} />
                            </Image>
                            <Image day="today">
                                <Icon name={WeatherIconMap[props.weather.today] as IconTypes} width={"130%"} height={"130%"} />
                            </Image>
                            <Image day="tomorrow">
                                <Icon name={WeatherIconMap[props.weather.tomorrow] as IconTypes} width={"70%"} height={"70%"} />
                            </Image>
                        </div>
                        <div style={{ width: "100%", height: "10%", display: "flex", textAlign: "center" }}>
                            <Day day="yestoday">昨日</Day>
                            <Day day="today">今日</Day>
                            <Day day="tomorrow">明日</Day>
                        </div>
                    </ImageBlock>
                ) : (
                    <ValueBlock>
                        <ValueNumber>
                            {props.number}
                            {props.number && (<ValueUnit unit={props.unit}>{props.unit}</ValueUnit>)}
                        </ValueNumber>

                    </ValueBlock>
                )}
            </>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: calc(100% - 5px);
    color: #fff;
`;

const TitleContent = styled.div`
    display: flex;
    height: 30%;
    width: 100%;
    align-items: center;
    justify-content: center;
    font-size: 2.5vw;
`
const ValueBlock = styled.div`
    display: flex;
    height: 70%;
    width: 100%;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background-color: #366836;
`
const ValueNumber = styled.div`
    position: relative;
    font-size: 50px;
`
const ValueUnit = styled.div<{ unit: string }>`
    position: absolute;
    font-size: 30px;
    bottom: ${props => props.unit === "℃" ? "0px" : "5px"};
    right: -30px;
`

const ImageBlock = styled.div`
    height: 70%;
    width: 100%;
    border-radius: 10px;
    background-color: #366836;
`

const Image = styled.div<{ day: string; }>`
    position: relative;
    display: flex;
    width: ${props => props.day === "today" ? "50%" : "25%"};
    height: 100%;
    align-items: center;
    justify-content: center;
`

const Day = styled.div<{ day: string; }>`
    position: relative;
    width: ${props => props.day === "today" ? "50%" : "25%"};
    height: 80%;
    justify-content: center;
`


export default Weather;