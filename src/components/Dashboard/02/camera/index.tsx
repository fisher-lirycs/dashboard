import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Carama: React.FC = () => {
    const { getCameraUrl } = window;
    const cameraToken = localStorage.getItem("cameraToken");
    const [cameraUrl, setCameraUrl] = useState("");


    useEffect(() => {
        getCameraUrl("exlnk-eJym4WXfkzLm", "UD&hNcC(g5-m", "1503-5254-4767-2882").then(data => {
            let url = data.url;
            let qs = "aspect_ratio=16_9&";
            qs += "pause_resume_enable=enable";
            setCameraUrl(url + "?" + qs)
        }).then(() => {

        }).catch(error => {
            console.log(error);
        })
    }, [getCameraUrl])

    useEffect(() => {
        axios({
            url: `https://external-api.mamory.jp/v1/camera_controls/${1503 - 5254 - 4767 - 2882}/brightness`,
            method: 'put',
            data: {
                "brightness": 1
            },
            headers: {
                "Authorization": cameraToken
            }
        }).then((data) => {
            console.log(data);
        }).catch(error => {
            console.log(error);
            
        })
    }, [cameraToken])


    return <CameraIframe id="cameraIframe" src={cameraUrl} />
}

const CameraIframe = styled.iframe`
    height: 100%;
    width: 100%;
    border: 1px solid silver;
    border-radius: 5px;
`

export default Carama