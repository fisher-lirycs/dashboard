import React from "react";
import styled from "styled-components";
import Title from "../Title";

const Rule: React.FC = () => {
    return (
        <RuleContainer>
            <TitleContent>
                <Title text={"ルール"} />
            </TitleContent>
            <DetailContent></DetailContent>
        </RuleContainer>
    )
}

const RuleContainer = styled.div`
    height: 100%;
    width: 100%;

`

const TitleContent = styled.div`
    width: 100%;
    height: 25px;
`

const DetailContent = styled.div`
    height: calc(100% - 35px);
    margin-top: 5px;
    padding: 5px;
    background: linear-gradient(#5acdef, #dff8ff);
`


export default Rule;