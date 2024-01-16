import React from "react";
import styled from "styled-components";
import { ReactComponent as Icon1CircleFill } from "./../../../../../assets/";

export interface CompassProps {
    direction: string;
    children?: React.ReactNode
}
const Compass: React.FC<CompassProps> = ({ direction }) => {
    return (
        <Container>
            <ValueBlock>
                <North>北</North>
                <South>南</South>
                <West>西</West>
                <East>東</East>
                <CompassPointBlock>

                </CompassPointBlock>
            </ValueBlock>
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background-color: orange;
    border-radius: 5px;
`

const ValueBlock = styled.div`
    position: absolute;
    bottom: 5px;
    left: 15%;
    width: 70%;
    height: 0;
    padding-bottom: 70%;
    background-color: #000000;
    border-radius: 5px;
    color: #ffffff;

    & > span {
        font-size: 15px;
    }
`

const North = styled.span`
    position: absolute;
    top: 5px;
    left: 45%;
    color: #ffffff;
`
const South = styled.span`
    position: absolute;
    bottom: 5px;
    left: 45%;
    color: #ffffff;
`
const East = styled.span`
    position: absolute;
    top: 45%;
    right: 5px;
    color: #ffffff;
`
const West = styled.span`
    position: absolute;
    top: 45%;
    left: 5px;
    color: #ffffff;
`

const CompassPointBlock = styled.div`
    position: absolute;
    top: 20%;
    left: 20%;
    width: 60%;
    height: 60%;
    background-color: #ffffff;
    border-radius: 50%;
`;

export default Compass;