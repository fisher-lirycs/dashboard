import React from "react";
import styled from "styled-components";
import Title from "../title";

const Rules: React.FC = () => {
    return (
        <Container>
            <Title>
                <span>ルール</span>
            </Title>
            <RulesBlock></RulesBlock>
        </Container>
    )
}

const Container = styled.div`
    height: 50%;
    padding: 20px;
`

const RulesBlock = styled.div`
    height: 80%;
    margin-top: 10px;
    padding: 10px;
    border-radius: 5px;
    background: linear-gradient(#5acdef, #dff8ff);
`


export default Rules;