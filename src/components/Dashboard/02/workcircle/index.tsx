import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Clock from "../clock";
import Title from "../title";
import ReactEcharts from "echarts-for-react"

const WorkCircle: React.FC = () => {
    const
        option = {
            title: {
                left: 'center'
            },
            tooltip: {
                show: false,
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            series: [
                {
                    type: 'pie',
                    radius: ['30%', "50%"],
                    center: ['50%', '30%'],
                    selectedMode: 'single',
                    data: [
                        { value: 735, name: 'A' },
                        { value: 510, name: 'B' },
                        { value: 434, name: 'C' },
                        { value: 335, name: 'D' }
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <Container>
            <Title>
                <span>安 全 施 工 サ イ ク ル</span>
            </Title>
            <ContainerCircle>
                {/* <ReactEcharts option={option} /> */}
                <ClockBlock>
                    <Clock width={"100%"} height={"100%"} borderColor={"silver"} time={time} />
                </ClockBlock>
            </ContainerCircle>
        </Container>
    )
}

const Container = styled.div`
    height: 100%;
    padding: 20px;
`

const ContainerCircle = styled.div`
    position: relative;
    margin: 0 auto;
    padding-top: 20px;
`

const ClockBlock = styled.div`
    position: absolute;
    left: 20%;
    width: 50%;
    height: 50%;
`

export default WorkCircle;