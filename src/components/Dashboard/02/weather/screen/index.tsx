import React from "react";
import styled from "styled-components";

export interface ScreenProps {
    size?: "large" | "small",
    item: string;
    value: string | number;
    unit: string;
    children?: React.ReactNode
}

const Screen: React.FC<ScreenProps> = ({ size = "small", item, value, unit }) => {
    return (
        <Container size={size}>
            <ItemBlock size={size}>
                <span>{item}</span>
            </ItemBlock>
            <ValueBlock size={size} unit={unit}>
                <span>{value}</span>
            </ValueBlock>
            <UnitBlock size={size}>
                <span>{unit}</span>
            </UnitBlock>
        </Container>
    )
}

const Container = styled.div<{ size: "large" | "small" }>`
    position: relative;
    display: ${props => props.size === "small" ? "block" : "flex"};
    align-items: center;
    width: ${props => props.size === "small" ? "32%" : "calc(100% - 10px)"};
    height: calc(100% - 20px);
    background-color: orange;
    border-radius: 5px;
    padding: 10px;
    margin-left: 1%;
`

const ItemBlock = styled.div<{ size: "large" | "small" }>`
    height: ${props => props.size === "small" ? "20%" : "auto"};
    font-weight: bold;
`

const ValueBlock = styled.div<{ size: "large" | "small", unit?: string }>`
    display: flex;
    width: ${props => props.size === "small" ? (props.unit ? "80%" : "90%") : "70%"};
    height: ${props => props.size === "small" ? "80%" : "95%"};
    margin: ${props => props.size === "small" ? "5px 0 0 0" : "0 0 0 5px"};
    align-items: center;
    justify-content: end;
    padding-right: 5px;
    background-color: #000000;
    border-radius: 5px;
    color: #ffffff;
    font-size: ${props => props.size === "small" ? "2vw" : "4vw"};
`
const UnitBlock = styled.div<{ size?: "large" | "small" }>`
    position: absolute;
    left: ${props => props.size === "large" ? "86%" : "82%"};
    bottom: 8%;
    font-size: 20px;
    font-weight: bold;
`

export default Screen;