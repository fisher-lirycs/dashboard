import React from "react";
import styled from "styled-components";
import Carama from "./Camera";
import Weather from "./Weather";

const CameraAndWeather: React.FC = () => {
    return (
        <CameraAndWeatherContainer>
            <CameraContent>
                <Carama />
            </CameraContent>
            <WeatherContent>
                <Weather />
            </WeatherContent>
        </CameraAndWeatherContainer>
    )
}

const CameraAndWeatherContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: #000;
`

const CameraContent = styled.div`
    display: flex;
    width: 100%;
    height: 70%;
    align-items: center;
    justify-content: center;
`

const WeatherContent = styled.div`
    width: calc(100% - 10px);
    height: 30%;
    padding: 5px;
`
export default CameraAndWeather