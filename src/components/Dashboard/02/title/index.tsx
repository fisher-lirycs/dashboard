import React from "react";
import styled from "styled-components";

export interface TitleProps {
    children: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({children}) => {
    return (
        <ContainerTitle>
            {children}
        </ContainerTitle>
    )
}

const ContainerTitle = styled.div`
    height: 25px;
    width: 100%;
    background: linear-gradient(#499549, #9ccd98, #499549);
    border-radius: 5px;
    text-align: center;

    & > span {
        color: #ffffff;
        font-weight: bold;
        font-size: 15px;
        line-height: 25px;
    }
`;

export default Title;