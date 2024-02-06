import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as ColseImage } from "./../../../../assets/images/home.svg";
import TransCarousel from "./Carousel";
import Circle from "../Circle";
import Reserve from "../Reserve";
import CameraAndWeather from "../CameraAndWeather";
import Safety from "../Safety";
import Rule from "../Rule";

export interface SliderProps {
  status: boolean;
  setStatus: (a: boolean) => void;
}

const Slider: React.FC<SliderProps> = ({ status, setStatus }) => {
  const [sliderTime, setSliterTime] = useState<number>(5);
  useEffect(() => {
    const time: number = Number.parseInt(
      localStorage.getItem("sliderTime") || "5"
    );
    setSliterTime(time);
  }, []);
  return (
    <Container>
      <SliderBackDrop />
      <SliderModal>
        <SliderModalDialog>
          <SliderContent>
            <TransCarousel interval={sliderTime * 1000}>
              <TransCarousel.Item>
                <SliderBlock>
                  <Circle />
                </SliderBlock>
              </TransCarousel.Item>
              <TransCarousel.Item>
                <SliderBlock>
                  <Reserve />
                </SliderBlock>
              </TransCarousel.Item>
              <TransCarousel.Item>
                <SliderBlock>
                  <CameraAndWeather />
                </SliderBlock>
              </TransCarousel.Item>
              <TransCarousel.Item>
                <SliderBlock>
                  <Safety />
                </SliderBlock>
              </TransCarousel.Item>
              <TransCarousel.Item>
                <SliderBlock>
                  <Rule />
                </SliderBlock>
              </TransCarousel.Item>
            </TransCarousel>
          </SliderContent>
          <CloseButton onClick={() => setStatus(!status)}>
            <ColseImage width={"100%"} height={"100%"} />
          </CloseButton>
        </SliderModalDialog>
      </SliderModal>
    </Container>
  );
};

const Container = styled.div`
  height: auto !important;
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
  transform: translate(-50%, -50%);
`;

const SliderContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  outline: 0;
`;

const CloseButton = styled.div`
  position: absolute;
  bottom: -50px;
  left: calc(50% - 50px);
  width: 100px;
  cursor: pointer;
`;

const SliderBlock = styled.div`
  height: 100%;
  width: 100%;
  background-color: #ffffff;
`;

export default Slider;
