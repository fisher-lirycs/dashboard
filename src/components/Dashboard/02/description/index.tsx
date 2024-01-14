import React from "react";
import styled from "styled-components";
import Title from "../title";

const Description: React.FC = () => {
    return (
        <Container>
            <LeftContainer>
                <LeftBlock>
                    <Title>
                        <span></span>
                    </Title>
                </LeftBlock>
                <LeftBlock>
                    <Title>
                        <span></span>
                    </Title>
                </LeftBlock>
            </LeftContainer>
            <RightContainer>
                <Title>
                    <span></span>
                </Title>
            </RightContainer>
        </Container>
    )
}

const Container = styled.div`
    height: calc(100% - 40px);
    padding: 20px 10px;
`

const LeftContainer = styled.div`
    float: left;
    width: 40%;
    height: 100%;
    padding: 0 10px;
`

const LeftBlock = styled.div`
    height: 50%;
`

const RightContainer = styled.div`
    float: right;
    width: 40%;
    height: 100%;
    padding: 0 10px;
`

export default Description;