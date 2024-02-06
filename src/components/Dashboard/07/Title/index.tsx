import React from "react";
import styled from "styled-components";

export interface TitleProps {
    text: string
}

const Title: React.FC<TitleProps> = ({ text }) => {
    return (
        <TitleContainer>
            <span>{text}</span>
        </TitleContainer>
    )
}

const TitleContainer = styled.div`
    height: 25px;
    width: 100%;
    background: linear-gradient(#499549, #9ccd98, #499549);
    text-align: center;

    & > span {
        color: #ffffff;
        font-weight: bold;
        font-size: 15px;
        line-height: 25px;
    }
`;

export default Title