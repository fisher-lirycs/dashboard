import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import BrightnessLight from "./../../../../assets/images/brightness_light.svg";
import BrightnessNormal from "./../../../../assets/images/brightness_regular.svg";
import BrightnessDark from "./../../../../assets/images/brightness_dark.svg";

const Carama: React.FC = () => {
    const { getCameraUrl } = window;
    const [cameraUrl, setCameraUrl] = useState("");
    const serialId = "1503-5254-4767-2882";
    const [controlToken, setControlToken] = useState("");
    const [brightless, setBrightless] = useState(0);

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

    useEffect(() => {
        axios({
            url: `https://external-api.mamory.jp/v1/auth/token`,
            method: 'post',
            data: {
                "user_id": "exlnk-eJym4WXfkzLm",
                "password": "UD&hNcC(g5-m"
            }
        }).then(({ data }) => {
            const access_token = data.access_token;
            setControlToken(access_token);
        }).catch(error => {
            console.log(error);

        })

    }, [])

    useEffect(() => {
        if (controlToken) {
            axios({
                url: `https://external-api.mamory.jp/v1/camera_controls/${serialId}/brightness`,
                method: 'put',
                data: {
                    "brightness": brightless
                },
                headers: {
                    Authorization: controlToken
                }
            })
        }
    }, [controlToken, brightless])


    return (
        <CameraContainer>
            {/* <BrightlessBlock>
                <BrightlessImage src={BrightnessLight} alt={"brightless"} onClick={() => setBrightless(1)} />
                <BrightlessImage src={BrightnessNormal} alt={"brightless"} onClick={() => setBrightless(0)} />
                <BrightlessImage src={BrightnessDark} alt={"brightless"} onClick={() => setBrightless(-1)} />
            </BrightlessBlock> */}
            <CameraIframe id="cameraIframe" src={cameraUrl} />
        </CameraContainer>
    )

}

const CameraContainer = styled.div`
    position: relative;
    display: flex;
    height: 100%;
    width: 100%;
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