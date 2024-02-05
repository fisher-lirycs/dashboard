import React, { useState, createContext, useCallback, useEffect } from "react";
import classNames from "classnames";
import { CarouselItem, CarouselItemProps } from "./Item";

export interface CarouselProps {
    defaultIndex?: number;
    fade?: boolean;
    interval?: number;
    slide?: boolean;
    dark?: boolean;
    className?: string;
    children: React.ReactNode;
}

export type TDirection = "next" | "prev";

export interface ICarouselContext {
    itemCount: number;
    activeIndex: number;
    direction: TDirection;
    slide?: boolean | undefined;
    fade?: boolean | undefined;
    onSelect?: (eventKey: number, event: Object | null) => void;
}

export const CarouselContext = createContext<ICarouselContext>({
    itemCount: 0,
    activeIndex: 0,
    direction: "next",
});

export const Carousel: React.FC<CarouselProps> = ({
    defaultIndex,
    fade,
    interval,
    slide,
    dark,
    className,
    children,
}) => {
    const itemCount = React.Children.toArray(children).length;
    const classes = classNames("carousel", "slide", className, {
        [`carousel-fade`]: fade,
        [`carousel-dark`]: dark,
    });
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childeElement =
                child as React.FunctionComponentElement<CarouselItemProps>;
            const { displayName } = childeElement.type;
            if (displayName === "CarouselItem") {
                return React.cloneElement(childeElement, { index });
            } else {
                console.warn(
                    "Warining: Carousel has a child which is not a CarouselItem"
                );
            }
        });
    };

    const [activeIndex, setActiveIndex] = useState(defaultIndex || 0);
    const [direction, setDirection] = useState<TDirection>("next");
    const passedContext: ICarouselContext = {
        itemCount: itemCount,
        activeIndex: activeIndex as number,
        slide: slide,
        fade: fade,
        direction: direction,
    };

    const handleClick = useCallback(
        (activeIndex: number, direction: TDirection) => {
            setDirection(direction);
            if (direction === "prev") {
                if (activeIndex === 0) {
                    setActiveIndex(itemCount - 1);
                } else {
                    setActiveIndex((activeIndex as number) - 1);
                }
            } else {
                if (activeIndex === itemCount - 1) {
                    setActiveIndex(0);
                } else {
                    setActiveIndex((activeIndex as number) + 1);
                }
            }
        },
        [itemCount]
    );

    useEffect(() => {
        if (interval && interval > 0) {
            const timer = setInterval(() => {
                handleClick(activeIndex, "next");
            }, interval);
            return () => clearInterval(timer);
        }
    }, [activeIndex, handleClick, interval]);

    return (
        <div className={classes}>
            <div className="carousel-inner">
                <CarouselContext.Provider value={passedContext}>
                    {renderChildren()}
                </CarouselContext.Provider>
            </div>
        </div>
    );
};

Carousel.defaultProps = {
    defaultIndex: 0,
    fade: false,
    interval: 2000,
    slide: true,
};

export type CarouselComponent = React.FC<CarouselProps> & {
    Item: React.FC<CarouselItemProps>;
};
const TransCarousel = Carousel as CarouselComponent;
TransCarousel.Item = CarouselItem;

export default TransCarousel;
