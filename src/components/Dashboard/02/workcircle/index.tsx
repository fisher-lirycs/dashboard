import React from "react";
import styled from "styled-components";
import MyClock from "../clock";
import Title from "../title";
import ReactEcharts from "echarts-for-react"

const WorkCircle: React.FC = () => {
    const option = {
        title: {
            text: '',
            subtext: '',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
            {
                type: 'pie',
                radius: '95%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                data: [
                    { value: 435, name: 'A' },
                    { value: 735, name: 'B' },
                    { value: 510, name: 'C' },
                    { value: 434, name: 'D' },
                    { value: 335, name: 'E' }
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
    return (
        <Container>
            <Title>
                <span>安 全 施 工 サ イ ク ル</span>
            </Title>
            <ContainerCircle>
                <ReactEcharts option={option} />
                <div style={{position: "absolute", top: "0"}}>
                    <MyClock />
                </div>
                
            </ContainerCircle>
        </Container>
    )
}

const Container = styled.div`
    height: 100%;
    weight: 100%;
    padding: 20px;
`

const ContainerCircle = styled.div`
    position: "relative";
    margin: 0 auto;
    padding-top: 20px;
`

const ClockBlock = styled.div`
    
`

export default WorkCircle;