import React from "react";
import styled from "styled-components";
import Title from "../Title";

const Safety: React.FC = () => {
    return (
        <SafetyContainer>
            <TitleContent>
                <Title text={"安 全"} />
            </TitleContent>
            <TextContent>
                <span>私はルールを正しく守り、</span>
                <br />
                <span>自分の身は自分で守ります</span>
            </TextContent>
        </SafetyContainer>
    )
}

const SafetyContainer = styled.div`
    width: 100%;
    height: 100%;
`

const TitleContent = styled.div`
    width: 100%;
    height: 25px;
`

const TextContent = styled.div`
    padding-left: 20px;
    margin-top: 20px;
    font-size: 1.5vw;
    font-weith: bold;
`

export default Safety;