import React, { useEffect } from "react";


const Mamory: React.FC = () => {
    useEffect(() => {
        const head = document.getElementsByTagName('head')[0] as HTMLElement;
        const scriptUrl = document.createElement('script');
        scriptUrl.type = 'text/javascript';
        scriptUrl.src = 'https://relay.mamory.jp/js/mamory-cameraview.js';
        head.appendChild(scriptUrl);
    }, []);
    return (
        <>
        </>
    )
}

export default Mamory;