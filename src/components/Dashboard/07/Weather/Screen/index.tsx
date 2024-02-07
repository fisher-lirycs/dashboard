import React from "react";
import styled from "styled-components";

export interface ScreenProps {
    item: string;
    value: number;
    unit: string;
}

const Screen: React.FC<ScreenProps> = ({ item, value, unit }) => {
    return (
        <Container>
            <ItemBlock>
                <span>{item}</span>
            </ItemBlock>
            <div style={{ display: "flex", height: "70%", width: "100%" }}>
                <ValueBlock unit={unit}>
                    <span>{value}</span>
                </ValueBlock>
                <UnitBlock>
                    <span>{unit}</span>
                </UnitBlock>
            </div>
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    align-items: center;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    background-color: orange;
    padding: 10px;
`

const ItemBlock = styled.div`
    font-weight: bold;
    color: #000;
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
    color: #000;
`

export default Screen;