import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Title from "../Title";
import Schedule from "./Schedule";

const Reserve: React.FC = () => {
    return (
        <CircleContainer>
            <TitleContent>
                <Title text={"今週の作業予定"} />
            </TitleContent>
            <ScheduleContent>
                <Schedule />
            </ScheduleContent>
        </CircleContainer>
    )
}

const CircleContainer = styled.div`
    width: 100%;
    height: 100%;
`
const TitleContent = styled.div`
    width: 100%;
    height: 25px;
`

const ScheduleContent = styled.div`
    display: flex;
    width: 100%;
    height: calc(100% - 25px);
    align-items: center;
    justify-content: center;
`

export default Reserve;