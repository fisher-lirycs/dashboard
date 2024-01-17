import React, { useCallback, useEffect, useRef } from "react";
import { PieType } from "../../../../types/Types";

export interface PieProps {
    width?: number | string;
    height?: number | string;
    data: Array<PieType>;
}

const Pie: React.FC<PieProps> = ({ width = "100%", height = "100%", data }) => {
    const canvasRef = useRef(null);
    const frameRef = useRef(null);

    const getAngleList = useCallback((data: Array<PieType>) => {
        const angleList: Array<number> = [];
        let total = 0;
        data.map(d => {
            total += d.value;
        });
        data.map(d => {
            angleList.push(Math.PI * 2 * (d.value / total));
        });
        return angleList;
    }, [data]);

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
                const angleList = getAngleList(data);

                const w = ctx.canvas.width;
                const h = ctx.canvas.height;
                const x0 = w / 2;
                const y0 = h / 2;
                let startAngle = 0;
                angleList.forEach(function (item, i) {
                    const endAngle = startAngle + item;
                    ctx.beginPath();
                    ctx.moveTo(x0, y0);
                    ctx.arc(x0, y0, x0, startAngle, endAngle);
                    ctx.fillStyle = data[i].color as string;
                    ctx.fill();

                    const str = data[i].name;

                    ctx.beginPath();
                    ctx.moveTo(0, h / 2);
                    ctx.lineTo(w, h / 2);
                    ctx.moveTo(w / 2, 0);
                    ctx.lineTo(w / 2, h);
                    ctx.strokeStyle = '#eee';
                    ctx.stroke();

                    // ctx.beginPath();
                    // ctx.strokeStyle = '#000';
                    // ctx.font = '40px Microsoft YaHei';
                    // ctx.textAlign = 'center';
                    // ctx.textBaseline = 'middle';
                    // ctx.fillText(str, x0, y0);
                    // ctx.beginPath();
                    // console.log(ctx.measureText(str));
                    // var width = ctx.measureText(str).width;
                    // ctx.moveTo(x0 - width / 2, y0 + 20);
                    // ctx.lineTo(x0 + width / 2, y0 + 20);
                    // ctx.stroke();

                    startAngle = endAngle;
                });

                ctx.moveTo(w / 2, h / 2);
                ctx.arc(w / 2, h / 2, w / 2, 0, -Math.PI / 2, true);
                ctx.fill();
            }
        }
    }, [data]);

    return (
        <div style={{ width: width, height: height }} ref={frameRef}>
            <canvas ref={canvasRef} />
        </div>
    )
}

export default Pie;