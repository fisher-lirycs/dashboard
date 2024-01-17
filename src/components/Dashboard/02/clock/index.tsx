import React, { useCallback, useEffect, useRef } from "react";

export interface ClockProps {
    width?: number | string;
    height: number | string;
    time: Date;
}

const Clock: React.FC<ClockProps> = ({ width = 300, height, time }) => {
    const canvasRef = useRef(null);

    const drawHour = useCallback((hour: number, minute: number, radius: number, ctx: CanvasRenderingContext2D) => {
        const radian = 2 * Math.PI / 12 * (hour - 3 + (minute / 60));
        const x = Math.cos(radian) * (radius - 80);
        const y = Math.sin(radian) * (radius - 80);
        ctx.beginPath();
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.moveTo(-x * .2, -y * .2);
        ctx.lineTo(x, y);
        ctx.stroke();
    }, []);

    const drawMinute = useCallback((minute: number, radius: number, ctx: CanvasRenderingContext2D) => {
        const radian = 2 * Math.PI / 60 * (minute - 15);
        const x = Math.cos(radian) * (radius - 50);
        const y = Math.sin(radian) * (radius - 50);

        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.moveTo(-x * .25, -y * .25);
        ctx.lineTo(x, y);
        ctx.stroke();
    }, []);

    const drawSecond = useCallback((second: number, radius: number, ctx: CanvasRenderingContext2D) => {
        const radian = 2 * Math.PI / 60 * (second - 15);
        const x = Math.cos(radian) * (radius - 30);
        const y = Math.sin(radian) * (radius - 30);

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.lineCap = 'round';
        ctx.moveTo(-x * .25, -y * .25);
        ctx.lineTo(x, y);
        ctx.stroke();
    }, []);

    const drawClock = useCallback((time: Date, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
        const radius = canvas.width / 2;
        ctx.translate(radius, radius);
        // 背景色
        ctx.beginPath();
        ctx.fillStyle = "#fff";
        ctx.arc(0, 0, radius - ctx.lineWidth, 0, 2 * Math.PI, false);
        ctx.fill()
        // 枠
        ctx.beginPath();
        ctx.lineWidth = 10;
        ctx.strokeStyle = '#333333';
        ctx.arc(0, 0, radius - ctx.lineWidth / 2, 0, 2 * Math.PI, false);
        ctx.stroke();

        // 数値
        ctx.font = "18px Arial";
        ctx.fillStyle = "#333";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        for (let i = 0; i < 12; i++) {
            const radian = 2 * Math.PI / 12 * (i - 2);
            const x = Math.cos(radian) * (radius - 35);
            const y = Math.sin(radian) * (radius - 35);
            ctx.fillText((i + 1).toString(), x, y);
        }

        for (let j = 0; j < 60; j++) {
            const radian = 2 * Math.PI / 60 * (j - 15);
            const x = Math.cos(radian) * (radius - 18);
            const y = Math.sin(radian) * (radius - 18);

            ctx.beginPath();
            if (j % 5 == 0) {
                ctx.fillStyle = "#333";
            } else {
                ctx.fillStyle = "#ccc";
            }
            ctx.arc(x, y, 2, 2 * Math.PI, 0, false);
            ctx.fill();
            ctx.closePath();
        }

        (date => {
            drawHour(date.getHours(), date.getMinutes(), radius, ctx);
            drawMinute(date.getMinutes(), radius, ctx);
            drawSecond(date.getSeconds(), radius, ctx)
        })(time);

        ctx.beginPath();
        ctx.fillStyle = "#fff";
        ctx.arc(0, 0, 3, 2 * Math.PI, 0, false);
        ctx.fill();

    }, [])

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current as HTMLCanvasElement;
            const context = canvas.getContext('2d');
            if (context) {
                context.setTransform(1, 0, 0, 1, 0, 0);
                context.clearRect(0, 0, canvas.width, canvas.height);
                const render = () => {
                    drawClock(time, canvas, context)
                }
                render()
            }
        }
    }, [time]);
    return (
        <canvas ref={canvasRef} width={width} height={height} />
    )
}

export default Clock;