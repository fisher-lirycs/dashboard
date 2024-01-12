import React, { useState, useEffect } from "react";
import styled from "styled-components";
import WorkCircle from "./workcircle";

const DashBoard: React.FC = () => {
    return (
        <Container>
            <ContainerHeader>
                <span>やりと心くばりを現場の隅々まで</span>
            </ContainerHeader>
            <ContainerMain>
                <ContainerLeft>
                    <Block height="50%"><WorkCircle /></Block>
                    <Block height="50%">222</Block>
                </ContainerLeft>
                <ContainerMiddle></ContainerMiddle>
                <ContainerRight></ContainerRight>
            </ContainerMain>
        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
    width: 100%;
`;

const ContainerHeader = styled.div`
    display: flex;
    height: 75px;
    width: 100%;
    align-items: center;
    background: linear-gradient(#499549, #a0eb9b, #499549);

    & > span {
        margin-left: 30px;
        color: #ffffff;
        font-weight: bold;
        font-size: 40px;
    }
`;

const ContainerMain = styled.div`
    display: flex;
    height: calc(100% - 75px);
    width: 100%;
`;

const ContainerLeft = styled.div`
    width: 25%;
    height: 100;
`

const ContainerMiddle = styled.div`
    width: 50%;
    height: 100;
    background-color: grey;
`

const ContainerRight = styled.div`
    width: 25%;
    height: 100;
`

const Block = styled.div<{ height: string }>`
    height: ${(props) => props.height};
    width: 100%;

`

export default DashBoard;