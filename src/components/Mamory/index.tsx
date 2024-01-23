import React, { useEffect, useState } from "react";
import axios from "axios";

const Mamory: React.FC = () => {
    type CameraResponseType = {
        AccessToken: string,
        url: string
    }
    const { getCameraUrl } = window;
    const [cameraUrl, setCameraUrl] = useState("");
    useEffect(() => {
        getCameraUrl("exlnk-eJym4WXfkzLm", "UD&hNcC(g5-m", "1503-5254-4767-2882").then(data => {
            let url = data.url;
            let qs = "aspect_ratio=16_9&";
            qs += "pause_resume_enable=enable";
            setCameraUrl(url + "?" + qs)
        }).catch(error => {
            console.log(error);
        })
    }, [getCameraUrl])
    return (
        <>
            <iframe id="frame1" width="400" height="300" src={cameraUrl}></iframe>
        </>
    )
}

export default Mamory;