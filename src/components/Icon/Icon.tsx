import React from "react";
import classNames from "classnames";
import { Icons, IconTypes } from "../../constant/Icon";

export interface IconProps {
    readonly name: IconTypes;
    readonly width?: number | string;
    readonly height?: number | string;
    readonly className?: string;
}

type SvgProps = {
    readonly svg: React.FC<React.SVGProps<SVGAElement>>;
    readonly width?: number | string;
    readonly height?: number | string;
    readonly className?: string;
};

const IconSvg: React.FC<SvgProps> = ({
    svg: Svg,
    width,
    height,
    className,
}) => {
    const classes = classNames("li", className);
    return <Svg width={width} height={height} className={classes} />;
};

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
        />
    );
};

Icon.defaultProps = {
    width: "1em",
    height: "1em",
};
export default Icon;
