import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Title from "../title";
import ClockAndPie from "../clockAndPie";
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
                <PieBlock>
                    <ClockAndPie width={"100%"} height={"100%"} pieData={data} time={time} borderColor="silver"/>
                </PieBlock >
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
    display: flex;
    justify-content: center;
    align-items: center;
`

const PieBlock = styled.div`
    width: 90%;
    height: 90%;
`

export default WorkCircle;