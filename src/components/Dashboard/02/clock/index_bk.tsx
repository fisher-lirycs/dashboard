import React, { useState, useEffect } from "react";
import Clock from 'react-clock';

const MyClock: React.FC = () => {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return <Clock value={time} />
}

export default MyClock;