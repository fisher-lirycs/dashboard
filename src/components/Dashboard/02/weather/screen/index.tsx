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

const Screen: React.FC<ScreenProps> = ({ width = "auto", height = "calc(100% - 20px)", item, value, unit, threshold }) => {
    return (
        <Container width={width} height={height}>
            <ItemBlock>
                <span>{item}</span>
            </ItemBlock>
            <div style={{ display: "flex", height: "70%", width: "100%" }}>
                <ValueBlock unit={unit}>
                    <span>{value}{threshold && threshold <= value && "/警戒"}</span>
                </ValueBlock>
                <UnitBlock>
                    <span>{unit}</span>
                </UnitBlock>
            </div>

        </Container>
    )
}

const Container = styled.div<{ width: string, height: string }>`
    position: relative;
    align-items: center;
    width: ${props => props.width};
    height: ${props => props.height};
    background-color: orange;
    border-radius: 5px;
    padding: 10px;
    margin-left: 1%;
    margin-bottom: 2%;
`

const ItemBlock = styled.div`
    font-weight: bold;
`

const ValueBlock = styled.div<{ unit?: string }>`
    display: flex;
    width: ${props => props.unit ? "80%" : "90%"};
    height: 100%;
    align-items: center;
    justify-content: end;
    padding-right: 5px;
    background-color: #000000;
    border-radius: 5px;
    color: #ffffff;
    font-size: 2vw;
`
const UnitBlock = styled.div`
    display: flex;
    align-items: end;
    height: 100%;
    font-size: 20px;
    font-weight: bold;
    margin-left: 5px;
`

export default Screen;