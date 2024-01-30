import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as ColseImage } from "./../../../../assets/images/home.svg";
import TransCarousel from "./Carousel";
import ClockAndPie from "../clockpie";
import Work from "../work";
import { PieType } from "../../../../types/Types";


export interface SliderProps {
    status: boolean;
    setStatus: (a: boolean) => void
    time: Date;
    borderColor?: string;
    pieData: Array<PieType>;
}

const Slider: React.FC<SliderProps> = ({ status, time, pieData, borderColor, setStatus }) => {
    const [sliderTime, setSliterTime] = useState<number>(5);
    useEffect(() => {
        const time: number = Number.parseInt(localStorage.getItem("sliderTime") || '5');
        setSliterTime(time);
    }, [])
    return (
        <Container>
            <SliderBackDrop />
            <SliderModal>
                <SliderModalDialog>
                    <SliderContent>
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
                    </SliderContent>
                    <CloseButton onClick={() => setStatus(!status)}>
                        <ColseImage width={"100%"} height={"100%"} color="#5cbf5c" />
                    </CloseButton>
                </SliderModalDialog>
            </SliderModal>
        </Container>
    )
}

const Container = styled.div`
    height: auto!important;
`;

const SliderBackDrop = styled.div`
    opacity: 0.9;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1040;
    width: 100vw;
    height: 100vh;
    background-color: rgb(0 0 0);
`;

const SliderModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1050;
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    outline: 0;
`;

const SliderModalDialog = styled.div`
    position: relative;
    width: 40%;
    height: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
`;

const SliderContent = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90%;
    pointer-events: auto;
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,.2);
    border-radius: 0.3rem;
    outline: 0;
`;


const CloseButton = styled.div`
    position: absolute;
    bottom : -50px;
    left: calc(50% - 25px); 
    width: 50px;
    cursor: pointer;
`;

const SliderBlock = styled.div`
    height: 100%;
    width: 100%;
`


export default Slider;