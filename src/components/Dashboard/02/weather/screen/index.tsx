import React from "react";
import styled from "styled-components";

export interface ScreenProps {
    size?: "large" | "small",
    width?: string,
    height?: string,
    item: string;
    value: number;
    unit: string;
    threshold?: number;
    children?: React.ReactNode
}

const Screen: React.FC<ScreenProps> = ({ size = "small", width = "auto", height = "calc(100% - 20px)", item, value, unit, threshold }) => {
    return (
        <Container size={size} width={width} height={height}>
            <ItemBlock size={size}>
                <span>{item}</span>
            </ItemBlock>
            <ValueBlock size={size} unit={unit}>
                <span>{value}{threshold && threshold <= value && "/警戒"}</span>
            </ValueBlock>
            <UnitBlock size={size}>
                <span>{unit}</span>
            </UnitBlock>
        </Container>
    )
}

const Container = styled.div<{ size: "large" | "small", width: string, height: string }>`
    position: relative;
    display: ${props => props.size === "small" ? "block" : "flex"};
    align-items: center;
    width: ${props => props.width};
    height: ${props => props.height};
    background-color: orange;
    border-radius: 5px;
    padding: 10px;
    margin-left: 1%;
    margin-bottom: 2%;
`

const ItemBlock = styled.div<{ size: "large" | "small" }>`
    font-weight: bold;
`

const ValueBlock = styled.div<{ size: "large" | "small", unit?: string }>`
    display: flex;
    width: ${props => props.size === "small" ? (props.unit ? "80%" : "90%") : "70%"};
    height: ${props => props.size === "small" ? "70%" : "95%"};
    margin: ${props => props.size === "small" ? "0" : "0 0 0 5px"};
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