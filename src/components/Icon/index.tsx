import React from "react";
import Icon from "./Icon";
import { Icons, IconTypes } from "../../constant/Icon";

const IconView: React.FC = () => {
    return (
        <>
            {Object.keys(Icons).map((key, index) => (
                <div key={index} style={{ margin: "10px", float: "left", textAlign: "center" }}>
                    <Icon name={key as IconTypes} width={100} height={100} />
                    <br />
                    <span>{key}</span>
                </div>
            ))}
        </>
    )
}

export default IconView