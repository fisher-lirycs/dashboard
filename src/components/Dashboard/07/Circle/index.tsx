import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ClockAndPie from "./Clockpie";
import { PieType } from "../../../../types/Types";
import Title from "../Title";

const Circle: React.FC = () => {
    const data: Array<PieType> = [
        { value: 735, name: 'A', color: "red" },
        { value: 510, name: 'B', color: "orange" },
        { value: 434, name: 'C', color: "pink" },
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
        <CircleContainer>
            <TitleContent>
                <Title text={"安 全 施 工 サ イ ク ル"} />
            </TitleContent>
            <PieContent>
                <ClockAndPie pieData={data} time={time} />
            </PieContent>
        </CircleContainer>
    )
}

const CircleContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: #fff;
`
const TitleContent = styled.div`
    width: 100%;
    height: 25px;
`

const PieContent = styled.div`
    display: flex;
    width: 100%;
    height: calc(100% - 25px);
    align-items: center;
    justify-content: center;
`

export default Circle;