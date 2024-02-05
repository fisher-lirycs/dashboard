import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TransCarousel from "./Carousel";
import ClockAndPie from "../clockpie";
import Work from "../work";
import { PieType } from "../../../../types/Types";


export interface SliderProps {
    time: Date;
    borderColor?: string;
    pieData: Array<PieType>;
}

const Slider: React.FC<SliderProps> = ({ time, pieData, borderColor }) => {
    const [sliderTime, setSliterTime] = useState<number>(5);
    useEffect(() => {
        const time: number = Number.parseInt(localStorage.getItem("sliderTime") || '5');
        setSliterTime(time);
    }, [])
    return (
        <Container>

            <TransCarousel interval={sliderTime * 1000}>
                <TransCarousel.Item>
                    <SliderBlock>
                        <ClockAndPie time={time} pieData={pieData} borderColor={borderColor} />
                    </SliderBlock>
                </TransCarousel.Item>
                <TransCarousel.Item>
                    <SliderBlock>
                        <Work headFontColor="#fff" />
                    </SliderBlock>
                </TransCarousel.Item>
            </TransCarousel>

        </Container>
    )
}

const Container = styled.div`
    height: 100%;
    width: 100%;
`;

const SliderBlock = styled.div`
    height: 100%;
    width: 100%;
    background-color: #5cbf5c;
`


export default Slider;