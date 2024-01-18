import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as CompassImage } from "./../../../../../assets/images/compass.svg";

export interface CompassProps {
    direction: string;
    children?: React.ReactNode
}
const Compass: React.FC<CompassProps> = ({ direction }) => {
    const [windDirection, setWindDirection] = useState("");
    const [windDeg, setWindDeg] = useState(0);


    useEffect(() => {
        switch (direction) {
            case "E":
                setWindDirection("東");
                setWindDeg(0);
                break;
            case "W":
                setWindDirection("西");
                setWindDeg(180);
                break;
            case "N":
                setWindDirection("北");
                setWindDeg(270);
                break;
            case "S":
                setWindDirection("南");
                setWindDeg(90);
                break;
            case "SE":
                setWindDirection("南東");
                setWindDeg(45);
                break;
            case "SW":
                setWindDirection("南西");
                setWindDeg(135);
                break;
            case "NE":
                setWindDirection("北東");
                setWindDeg(315);
                break;
            case "NW":
                setWindDirection("北西");
                setWindDeg(225);
                break;
        }
    }, [direction])


    return (
        <Container>
            <PointBlock>
                <ValueBlock>{windDirection}</ValueBlock>
                <North>北</North>
                <South>南</South>
                <West>西</West>
                <East>東</East>
                <CompassPointBlock>
                    <CompassImageBlock deg={windDeg}>
                        <CompassImage width={"100%"} height={"100%"} />
                    </CompassImageBlock>
                </CompassPointBlock>
            </PointBlock>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: orange;
    border-radius: 5px;
`

const ValueBlock = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: -35px;
    right: 0;
    width: 40%;
    height: 30px;
    border-radius: 5px;
    background-color: #000000;
    color: #ffffff;
`

const PointBlock = styled.div`
    position: relative;
    left: 20%;
    width: 60%;
    height: 0;
    margin-top: 30px;
    padding-bottom: 60%;
    background-color: #000000;
    border-radius: 5px;
    color: #ffffff;

    & > span {
        font-size: 15px;
    }
`

const North = styled.span`
    position: relative;
    top: 5px;
    left: 45%;
    color: #ffffff;
`
const South = styled.span`
    position: absolute;
    bottom: 5px;
    left: 45%;
    color: #ffffff;
`
const East = styled.span`
    position: absolute;
    top: 45%;
    right: 5px;
    color: #ffffff;
`
const West = styled.span`
    position: absolute;
    top: 45%;
    left: 5px;
    color: #ffffff;
`

const CompassPointBlock = styled.div`
    position: absolute;
    top: 20%;
    left: 20%;
    width: 60%;
    height: 60%;
    background-color: #ffffff;
    border-radius: 50%;
`;

const CompassImageBlock = styled.div<{ deg: number }>`
    position: absolute;
    top: 20%;
    left: 20%;
    width: 60%;
    height: 60%;
    transform: rotate(${props => props.deg}deg);
`;

export default Compass;