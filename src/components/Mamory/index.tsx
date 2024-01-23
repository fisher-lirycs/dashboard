import React, { useEffect } from "react";
import axios from "axios";

const Mamory: React.FC = () => {
    const { getCameraUrl } = window;
    useEffect(() => {
        getCameraUrl("exlnk-eJym4WXfkzLm", "UD&hNcC(g5-m", "1503-5254-4767-2882").then(data => {
            console.log(data);
        }).catch(error => {
            console.log(error);
        })
    }, [getCameraUrl])
    return (
        <>
            <iframe id="frame1" width="400" height="300"></iframe>
        </>
    )
}

export default Mamory;