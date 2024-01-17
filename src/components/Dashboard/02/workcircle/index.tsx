import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Clock from "../clock";
import Title from "../title";
import Pie from "../pie";
import { PieType } from "../../../../types/Types";

const WorkCircle: React.FC = () => {
    const data: Array<PieType> = [
        { value: 735, name: 'A', color: "red" },
        { value: 510, name: 'B', color: "orange" },
        { value: 434, name: 'C', color: "blue" },
        { value: 335, name: 'D', color: "green" }
    ];

    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <Container>
            <Title>
                <span>安 全 施 工 サ イ ク ル</span>
            </Title>
            <ContainerCircle>
                <ClockBlock>
                    <Clock width={"100%"} height={"100%"} borderColor={"silver"} time={time} />
                    <Pie width={"100%"} height={"100%"} data={data} />
                </ClockBlock >
            </ContainerCircle>
        </Container>
    )
}

const Container = styled.div`
    height: 100%;
    padding: 20px;
`

const ContainerCircle = styled.div`
    position: relative;
    margin: 0 auto;
    padding-top: 20px;
`

const ClockBlock = styled.div`
    position: absolute;
    left: 20%;
    width: 50%;
    height: 50%;
`

export default WorkCircle;