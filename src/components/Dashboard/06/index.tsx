import React from "react";
import styled from "styled-components";
import { ReactComponent as ColseImage } from "./../../../assets/images/home.svg";
import Carama from "./camera";

const Dashboard06: React.FC = () => {

    return (
        <Container>
            <Content>
                <Carama />
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
    width: 500px;
    height: 500px;
`

const CloseButton = styled.div`
    position: absolute;
    top: 0;
    cursor: pointer;
    z-index: 9999;
`;

export default Dashboard06;