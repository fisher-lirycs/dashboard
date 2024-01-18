import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { PieType } from "../../../../types/Types";

export interface PieProps {
    width?: number | string;
    height?: number | string;
    time: Date;
    borderColor?: string;
    pieData: Array<PieType>;
}

const ClockAndPie: React.FC<PieProps> = ({ width = "100%", height = "100%", time, borderColor, pieData }) => {
    const canvasRef = useRef(null);
    const frameRef = useRef(null);


    const transformAngle = useCallback((data: Array<PieType>) => {
        let total = 0;
        data.forEach(el => total += el.value);

        data.forEach(item => {
            const angle = item.value / total * Math.PI * 2;
            item.angle = angle;
        })

        return data;
    }, [])

    const drawTitle = useCallback((
        ctx: CanvasRenderingContext2D
        , startAngle: number
        , angle: number
        , outColor: string
        , outTitle: string
        , radius: number
        , outLine: number
        , x0: number
        , y0: number
    ) => {
        ctx.shadowBlur = 0;
        const edge = radius + outLine;
        const edgeX = Math.cos(startAngle + angle / 2) * edge;
        const edgeY = Math.sin(startAngle + angle / 2) * edge;
        const outX = x0 + edgeX;
        const outY = y0 + edgeY;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(outX, outY);
        ctx.strokeStyle = outColor;
        ctx.font = 'bold 16px Arial';
        const textWidth = ctx.measureText(outTitle).width;
        if (outX > x0) {
            ctx.lineTo(outX + textWidth + 10, outY)
            ctx.textAlign = 'left'
        } else {
            ctx.textAlign = 'right'
            ctx.lineTo(outX - textWidth - 10, outY)
        }
        ctx.stroke();
        ctx.textBaseline = 'bottom';
        ctx.fillText(outTitle, outX, outY)
    }, []);

    const drawPie = useCallback((ctx: CanvasRenderingContext2D) => {
        const w = ctx.canvas.width * 0.7;
        const h = ctx.canvas.height * 0.7;
        const x0 = w / 2 + 50;
        const y0 = h / 2 + 40;
        const radius = w / 2;
        const outLine = 20;

        const angleList = transformAngle(pieData);
        let startAngle = 0;
        angleList.forEach((item, index) => {
            let endAngle = startAngle + (item.angle as number);
            ctx.beginPath();
            ctx.moveTo(x0, y0)
            ctx.arc(x0, y0, radius, startAngle, endAngle);
            const outColor = ctx.fillStyle = (item.color as string);
            ctx.fill();
            drawTitle(ctx, startAngle, item.angle as number, outColor, item.name, radius, outLine, x0, y0);
            startAngle = endAngle;
        });
    }, []);


    // drwa clock from here
    const drawHour = useCallback((hour: number, minute: number, radius: number, ratio: number, ctx: CanvasRenderingContext2D) => {
        const radian = 2 * Math.PI / 12 * (hour - 3 + (minute / 60));
        const x = Math.cos(radian) * (radius - 70 * ratio);
        const y = Math.sin(radian) * (radius - 70 * ratio);
        ctx.beginPath();
        ctx.lineWidth = 6 * ratio;
        ctx.lineCap = 'round';
        ctx.strokeStyle = "#333333";
        ctx.moveTo(-x * .2 + 70 * ratio, -y * .2 + 60 * ratio);
        ctx.lineTo(x + 70 * ratio, y + 60 * ratio);
        ctx.stroke();
    }, []);

    const drawMinute = useCallback((minute: number, radius: number, ratio: number, ctx: CanvasRenderingContext2D) => {
        const radian = 2 * Math.PI / 60 * (minute - 15);
        const x = Math.cos(radian) * (radius - 50 * ratio);
        const y = Math.sin(radian) * (radius - 50 * ratio);

        ctx.beginPath();
        ctx.lineWidth = 3 * ratio;
        ctx.lineCap = 'round';
        ctx.moveTo(-x * .25 + 70 * ratio, -y * .25 + 60 * ratio);
        ctx.lineTo(x + 70 * ratio, y + 60 * ratio);
        ctx.stroke();
    }, []);

    const drawSecond = useCallback((second: number, radius: number, ratio: number, ctx: CanvasRenderingContext2D) => {
        const radian = 2 * Math.PI / 60 * (second - 15);
        const x = Math.cos(radian) * (radius - 30 * ratio);
        const y = Math.sin(radian) * (radius - 30 * ratio);

        ctx.beginPath();
        ctx.lineWidth = 1 * ratio;
        ctx.lineCap = 'round';
        ctx.moveTo(-x * .25 + 70 * ratio, -y * .25 + 60 * ratio);
        ctx.lineTo(x + 70 * ratio, y + 60 * ratio);
        ctx.stroke();
    }, []);

    const drawClock = useCallback((time: Date, frameWidth: number, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
        const w = ctx.canvas.width * 0.6;
        const h = ctx.canvas.height * 0.6;
        const radius = w / 2;
        const ratio = frameWidth / canvas.width;
        ctx.translate(radius, radius);
        // 背景色
        ctx.beginPath();
        ctx.fillStyle = "#fff";
        ctx.arc(70 * ratio, 60 * ratio, radius - ctx.lineWidth, 0, 2 * Math.PI, false);
        ctx.fill()
        // 枠
        ctx.beginPath();
        ctx.lineWidth = 7 * ratio;
        ctx.strokeStyle = borderColor || "#333333";
        ctx.arc(70 * ratio, 60 * ratio, radius - ctx.lineWidth / 2, 0, 2 * Math.PI, false);
        ctx.stroke();

        // 数値
        ctx.font = `${18 * ratio}px Arial`;
        ctx.fillStyle = "#333";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        for (let i = 0; i < 12; i++) {
            const radian = 2 * Math.PI / 12 * (i - 2);
            const x = Math.cos(radian) * (radius - 35 * ratio);
            const y = Math.sin(radian) * (radius - 35 * ratio);
            ctx.fillText((i + 1).toString(), x + 70 * ratio, y + 60 * ratio);
        }

        for (let j = 0; j < 60; j++) {
            const radian = 2 * Math.PI / 60 * (j - 15);
            const x = Math.cos(radian) * (radius - 18 * ratio);
            const y = Math.sin(radian) * (radius - 18 * ratio);

            ctx.beginPath();
            if (j % 5 == 0) {
                ctx.fillStyle = "#333";
            } else {
                ctx.fillStyle = "#ccc";
            }
            ctx.arc(x + 70 * ratio, y + 60 * ratio, 2 * ratio, 2 * Math.PI, 0, false);
            ctx.fill();
            ctx.closePath();
        }

        (date => {
            drawHour(date.getHours(), date.getMinutes(), radius, ratio, ctx);
            drawMinute(date.getMinutes(), radius, ratio, ctx);
            drawSecond(date.getSeconds(), radius, ratio, ctx)
        })(time);

        ctx.beginPath();
        ctx.fillStyle = "#fff";
        ctx.arc(70 * ratio, 60 * ratio, 3 * ratio, 2 * Math.PI, 0, false);
        ctx.fill();

    }, [])

    useEffect(() => {
        let frameWidth = 0;
        if (frameRef.current) {
            const frame = frameRef.current as HTMLDivElement;
            frameWidth = frame.offsetWidth;
        }

        if (canvasRef.current) {
            const canvas = canvasRef.current as HTMLCanvasElement;
            canvas.width = frameWidth;
            canvas.height = frameWidth;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawPie(ctx);
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                drawClock(time, frameWidth, canvas, ctx);
            }
        }
    }, [time, borderColor, pieData]);

    return (
        <Container ref={frameRef} width={width} height={height}>
            <canvas ref={canvasRef} />
        </Container>
    )
}

const Container = styled.div<{ width: number | string, height: number | string }>`
    display: flex;
    width: ${props => props.width};
    height: ${props => props.height};
    align-items: center;
    justify-content: center;
`
export default ClockAndPie;