import React from "react";
import styled from "styled-components";
import Icon from "../../../Icon/Icon";
import { Icons, IconTypes, WeatherIconMap } from "../../../../constant/Icon";

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
    return (
        <Container>
            <Title>{props.title}</Title>
            {props.kubun === "image" && props.icon && (
                <>
                    <ImageContainer>
                        <Image>
                            <Icon name={WeatherIconMap[props.icon] as IconTypes} width={"100%"} height={"100%"} />
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
    width: 100%;
    height: 70%;
    text-align: center;
`;

const Image = styled.div`
    position: relative;
    top: -10%;
    width: 100%;
    height: 100%;
`;

const ImageMemo = styled.div<{ timer?: string }>`
    position: relative;
    top: -10%;
    width: 100px;
    margin: 0 auto;
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