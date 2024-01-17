import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { PieType } from "../../../../types/Types";

export interface PieProps {
    width?: number | string;
    height?: number | string;
    data: Array<PieType>;
}

const Pie: React.FC<PieProps> = ({ width = "100%", height = "100%", data }) => {
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
                const w = ctx.canvas.width * 0.7;
                const h = ctx.canvas.height * 0.7;
                const x0 = w / 2 + 50;
                const y0 = h / 2 + 40;
                const radius = w / 2;
                const outLine = 20;
                const rectW = 30;
                const rectH = 16;
                const space = 20;

                const angleList = transformAngle(data);
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




                // let startAngle = 0;
                // angleList.forEach(function (item, i) {
                //     const endAngle = startAngle + item;
                //     ctx.beginPath();
                //     ctx.moveTo(x0, y0);
                //     ctx.arc(x0, y0, x0, startAngle, endAngle);
                //     ctx.fillStyle = data[i].color as string;
                //     ctx.fill();

                //     const str = data[i].name;

                //     ctx.beginPath();
                //     ctx.moveTo(0, h / 2);
                //     ctx.lineTo(w, h / 2);
                //     ctx.moveTo(w / 2, 0);
                //     ctx.lineTo(w / 2, h);
                //     ctx.strokeStyle = '#eee';
                //     ctx.stroke();

                //     // ctx.beginPath();
                //     // ctx.strokeStyle = '#000';
                //     // ctx.font = '40px Microsoft YaHei';
                //     // ctx.textAlign = 'center';
                //     // ctx.textBaseline = 'middle';
                //     // ctx.fillText(str, x0, y0);
                //     // ctx.beginPath();
                //     // console.log(ctx.measureText(str));
                //     // var width = ctx.measureText(str).width;
                //     // ctx.moveTo(x0 - width / 2, y0 + 20);
                //     // ctx.lineTo(x0 + width / 2, y0 + 20);
                //     // ctx.stroke();

                //     startAngle = endAngle;
                // });

                // ctx.moveTo(w / 2, h / 2);
                // ctx.arc(w / 2, h / 2, w / 2, 0, -Math.PI / 2, true);
                // ctx.fill();
            }
        }
    }, [data]);

    return (
        <Container ref={frameRef} width={width} height={height}>
            <canvas ref={canvasRef} style={{ margin: "20px" }} />
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
export default Pie;