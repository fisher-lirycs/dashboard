import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Carama: React.FC = () => {
    const { getCameraUrl } = window;
    const [cameraUrl, setCameraUrl] = useState("");
    const serialId = "1503-5254-4767-2882";
    const [controlToken, setControlToken] = useState("");

    useEffect(() => {
        getCameraUrl("exlnk-eJym4WXfkzLm", "UD&hNcC(g5-m", serialId).then(data => {
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
                    "brightness": 1
                },
                headers: {
                    Authorization: controlToken
                }
            }).then((data) => {
                console.log("success");
                console.log(data);
            }).catch(error => {
                console.log(error);

            })
        }
    }, [controlToken])


    return <CameraIframe id="cameraIframe" src={cameraUrl} />
}

const CameraIframe = styled.iframe`
    height: 100%;
    width: 100%;
    border: 1px solid silver;
    border-radius: 5px;
`

export default Carama