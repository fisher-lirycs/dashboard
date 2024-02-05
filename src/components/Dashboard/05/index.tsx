import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Slider from "./slider";
import { PieType } from "../../../types/Types";
import { ReactComponent as ColseImage } from "./../../../assets/images/home.svg";

const Dashboard05: React.FC = () => {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const data: Array<PieType> = [
        { value: 735, name: 'A', color: "red" },
        { value: 510, name: 'B', color: "blue" },
        { value: 434, name: 'C', color: "pink" },
        { value: 335, name: 'D', color: "yellow" }
    ];

    return (
        <Container>
            <Content>
                <Slider pieData={data} time={time} borderColor="silver" />
                <CloseButton onClick={() => window.history.back()}>
                    <ColseImage width={"20px"} height={"20px"} color="red" />
                </CloseButton>
            </Content>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`
const Content = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`

const CloseButton = styled.div`
    position: absolute;
    top: 0;
    cursor: pointer;
    z-index: 9999;
`;

export default Dashboard05;