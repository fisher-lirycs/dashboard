import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

export interface ScrollProps {
    text: string
}

const Scroll: React.FC<ScrollProps> = ({ text }) => {
    const wrapContentRef = useRef<HTMLDivElement>(null)
    const textContentRef = useRef<HTMLDivElement>(null)

    const [left, setLeft] = useState(9999)
    const [transform, setTransform] = useState(0)
    const [transition, setTransition] = useState(`transform 5s linear`)
    const [stopInterval, setStopInterval] = useState(false)


    let timerX: NodeJS.Timer;
    const setPosition = () => {
        const wrapContent = wrapContentRef.current;
        const textContent = textContentRef.current;
        if (wrapContent && textContent) {
            const { width: wrapWidth } = wrapContent.getBoundingClientRect();
            const { width: textWidth } = textContent.getBoundingClientRect();
            setStopInterval(true)
            setLeft(wrapWidth)
            if (transform < 0 && ((Math.abs(transform) - wrapWidth) > textWidth)) {
                setTransition('')
                setTransform(0)
                setTimeout(() => {
                    setStopInterval(false)
                }, 100)
            } else {
                setTransition(`transform 10s linear`)
                setTransform(transform - 2 * textWidth)
                setTimeout(() => {
                    setStopInterval(false)
                }, 10000)
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
        <Container ref={wrapContentRef}>
            <TextContent ref={textContentRef} style={{
                left,
                transform: `translateX(${transform}px)`,
                transition
            }}>{text}</TextContent>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    overflow: hidden;
`

const TextContent = styled.div`
    position: absolute;
    white-space: nowrap;
    word-wrap: normal;
`

export default Scroll;