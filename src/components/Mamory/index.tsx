import React, { useEffect } from "react";

const Mamory: React.FC = () => {
    const { mamoryLogin } = window;
    useEffect(() => {
        mamoryLogin()
            .then(data => console.log(data))
            .catch(error => console.log(error))
    }, [])
    return (
        <>
            <iframe id="frame1" width="400" height="300"></iframe>
        </>
    )
}

export default Mamory;