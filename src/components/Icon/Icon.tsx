import React from "react";
import { Icons, IconTypes } from "../../constant/Icon";

export interface IconProps {
    readonly name: IconTypes;
    readonly width?: number | string;
    readonly height?: number | string;
    readonly className?: string;
}

export const Icon: React.FC<IconProps> = ({
    name,
    width,
    height,
    className,
}) => {
    return (
        <img
            src={Icons[name]}
            width={width}
            height={height}
            className={className}
            alt={name}
        />
    );
};

Icon.defaultProps = {
    width: "1em",
    height: "1em",
};
export default Icon;
