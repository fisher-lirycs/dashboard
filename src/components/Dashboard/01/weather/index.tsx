import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { WeatherType } from "../../../../types/Types";
import axios from "axios";

export type WeatherProps = ({
    kubun: "image";
    icon: string | undefined;
    timer: "Today" | "Tomorrow";
} | {
    kubun: "number";
    val?: number | undefined;
    unit?: string | undefined;
    type?: "temp" | "rain"
}) & {
    title: string;
    children?: React.ReactNode;
}


const Weather: React.FC<WeatherProps> = (props) => {

    const [weather, setWeather] = useState<WeatherType>();
    useEffect(() => {
        axios.get("https://api.openweathermap.org/data/2.5/weather?lat=35.558751&lon=139.715263&units=metric&appid=2d6f72fd863d8dbb934d557c5009e646").then(({ data }) => {
            debugger;
            setWeather(data);
        })
    }, []);
    
    return (
        <Container>
            <Title>{props.title}</Title>
            {props.kubun === "image" && props.icon && (
                <>
                    <ImageContainer>
                        <Image>
                            <img src={`https://openweathermap.org/img/wn/${props.icon}@2x.png`} alt="" />
                        </Image>
                    </ImageContainer>
                    <ImageMemo timer={props.timer}>{props.timer}</ImageMemo>
                </>
            )}
            {props.kubun === "number" && props.val && (
                <NumberContainer>
                    <span>{props.val}</span>
                    <NumberUnit>{props.type === 'temp' ? "℃" : "%"}</NumberUnit>
                </NumberContainer>
            )}
        </Container>
    )

}

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const Title = styled.div`
    display: flex;
    width: 80%;
    height: 20%;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    border: solid 2px #ffffff;
    border-radius: 2px;
    font-weight: 700;
`;

const ImageContainer = styled.div`
    position: relative;
    textAlign: center;
`;

const Image = styled.div`
    position: absolute;
    top: -20px;
    left: calc(50% - 50px);
`;

const ImageMemo = styled.div<{ timer?: string }>`
    width: 100px;
    margin: 60px auto 0;
    padding: 2px 0;
    text-align: center;
    background-color: ${(props) => props.timer === 'Today' ? 'green' : 'orange'};
    border-radius: 5px;
`;

const NumberContainer = styled.div`
    position: relative;
    width: 80%;
    margin: 0 auto;
    font-size: 5vw;
`;

const NumberUnit = styled.span`
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 3vw;
`;


export default Weather;