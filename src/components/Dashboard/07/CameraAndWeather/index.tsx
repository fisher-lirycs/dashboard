import React from "react";
import styled from "styled-components";
import Carama from "./Camera";

const CameraAndWeather: React.FC = () => {
    return (
        <CameraAndWeatherContainer>
            <CameraContent>
                <Carama />
            </CameraContent>

        </CameraAndWeatherContainer>
    )
}

const CameraAndWeatherContainer = styled.div`
    width: 100%;
    height: 100%;
`

const CameraContent = styled.div`
    width: 100%;
    height: 70%;
`
export default CameraAndWeather