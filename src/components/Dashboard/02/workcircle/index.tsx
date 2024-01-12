import React from "react";
import styled from "styled-components";
import MyClock from "../clock";
import Title from "../title";

const WorkCircle: React.FC = () => {
    return (
        <Container>
            <Title>
                <span>安 全 施 工 サ イ ク ル</span>
            </Title>
            <ContainerCircle>
                <MyClock />
            </ContainerCircle>
        </Container>
    )
}

const Container = styled.div`
    height: 100%;
    weight: 100%;
    padding: 20px;
`

const ContainerCircle = styled.div`
    margin: 0 auto;
    padding-top: 20px;
`

export default WorkCircle;