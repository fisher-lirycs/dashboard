import React, { useState, useEffect, ReactNode } from "react";
import styled from "styled-components";

export interface ScrollProps {
    text: string
}

const Scroll: React.FC<ScrollProps> = ({ text }) => {
    const [left, setLeft] = useState(9999)
    const [transform, setTransform] = useState(0)
    const [transition, setTransition] = useState(`transform 5s linear`)
    const [stopInterval, setStopInterval] = useState(false)
    let scrollXStyle = {
        left,
        transform: `translateX(${transform}px)`,
        transition
    }
    
    let timerX: NodeJS.Timer;
    const setPosition = () => {
        const textWidth = document.getElementById('scroll_x_text')?.clientWidth
        const fatherWidth = document.getElementById('scroll_x')?.clientWidth
        setStopInterval(true)
        if (fatherWidth && textWidth) {
            setLeft(fatherWidth)
            if (transform < 0 && ((Math.abs(transform) - fatherWidth) > textWidth)) {
                setTransition('')
                setTransform(0)
                setTimeout(() => {
                    setStopInterval(false)
                }, 100)

            } else {
                setTransition(`transform 5s linear`)
                setTransform(transform - fatherWidth)
                setTimeout(() => {
                    setStopInterval(false)
                }, 5000)
            }
        }
    }

    useEffect(() => {
        if (stopInterval) {
            clearInterval(timerX)
        } else {
            timerX = setInterval(setPosition, 1000)
        }
        return () => {
            clearInterval(timerX)
        }
    }, [stopInterval])

    return (
        <Container id="scroll_x">
            <TextContent id="scroll_x_text" style={scrollXStyle}>{text}</TextContent>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
`

const TextContent = styled.div`
    position: absolute;
    white-space: nowrap;
    word-wrap: normal;
    top: 0;
`

export default Scroll;