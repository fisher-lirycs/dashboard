import React, { useEffect } from "react";
import axios from "axios";

const Mamory: React.FC = () => {
    const { mamoryLogin } = window;
    useEffect(() => {
        mamoryLogin()
            .then(data => console.log(data))
            .catch(error => console.log(error))
    }, [])
    // useEffect(() => {
    //     axios.post("https://external-api.mamory.jp/v1/auth/token", {
    //         "user_id": "exlnk-eJym4WXfkzLm",
    //         "password": "UD&hNcC(g5-m"
    //     }).then(data => console.log(data))
    //         .catch(err => console.log(err))
    // }, [])
    return (
        <>
            <iframe id="frame1" width="400" height="300"></iframe>
        </>
    )
}

export default Mamory;