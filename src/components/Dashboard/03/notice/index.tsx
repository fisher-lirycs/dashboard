import React from "react";
import styled from "styled-components";

const Notice: React.FC = () => {
    return (
        <Container>
            <TitleContent>お知らせ</TitleContent>
            <InfomationArea />
        </Container>
    )
}
const Container = styled.div`
    width: 100%;
    height: 100%;
    color: #fff;
`

const TitleContent = styled.div`
    display: flex;
    height: 10%;
    width: 100%;
    align-items: center;
    justify-content: center;
    font-size: 2.5vw;
`

const InfomationArea = styled.div`
    height: 89%;
    width: 100%;
    background-color: #366836;
    border-radius: 10px;
`

export default Notice;