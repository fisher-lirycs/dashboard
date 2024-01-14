import React from "react";
import styled from "styled-components";
import Title from "../title";

const Safety: React.FC = () => {
    return (
        <Container>
            <Title>
                <span>安全</span>
            </Title>
            <TextBlock>
                <span>私はルールを正しく守り、</span>
                <br />
                <span>自分の身は自分で守ります</span>
            </TextBlock>
        </Container>

    )
}

const Container = styled.div`
    height: 30%;
    padding: 20px;
`

const TextBlock = styled.div`
    padding-left: 20px;
    margin-top: 20px;
    font-size: 30px;
    font-weith: bold;
`

export default Safety;