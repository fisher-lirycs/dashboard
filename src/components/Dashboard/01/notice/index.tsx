import React from "react";
import styled from "styled-components";

const Notice: React.FC = () => {
    return (
        <Container>
            <Title>作業所からのお知らせ</Title>
            <InfomationArea />
        </Container>
    )
}
const Container = styled.div`
    height: calc(100% - 80px);
`

const Title = styled.div`
    margin-top: 80px;
    font-size: 30px;
`

const InfomationArea = styled.div`
    width: 100%;
    height: calc(100% - 45px);
    background-color: #edededeb;
    border-radius: 10px;
`

export default Notice;