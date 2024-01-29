import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Carama: React.FC = () => {
    const { getCameraUrl } = window;
    const [cameraUrl, setCameraUrl] = useState("");
    const serialId = "1503-5254-4767-2882";

    useEffect(() => {
        getCameraUrl("exlnk-eJym4WXfkzLm", "UD&hNcC(g5-m", serialId).then(data => {
            let url = data.url;
            let qs = "aspect_ratio=4_3&";
            qs += "pause_resume_enable=enable";
            setCameraUrl(url + "?" + qs)
        }).then(() => {

        }).catch(error => {
            console.log(error);
        })
    }, [getCameraUrl])

    return (
        <CameraContainer>
            <CameraIframe id="cameraIframe" src={cameraUrl} />
        </CameraContainer>
    )

}

const CameraContainer = styled.div`
    position: relative;
    display: flex;
    height: 80%;
    width: 80%;
    align-items: center;
    justify-content: center;
`

const BrightlessBlock = styled.div`
    position: absolute;
    top: -10px;
    right: 20px;
    color: #fff;
`

const BrightlessImage = styled.img`
    width: 20px;
    height: 20px;
    cursor: pointer;
`

const CameraIframe = styled.iframe`
    height: 100%;
    width: 100%;
    border: 1px solid silver;
    border-radius: 5px;
`

export default Carama