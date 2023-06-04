import React, { useState, useEffect } from 'react';

import css from './Clock.module.css';

export const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
        setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const hours = time.getHours().toString().length === 1 ? `0${time.getHours()}` : time.getHours();
    const minutes = time.getMinutes().toString().length === 1 ? `0${time.getMinutes()}` : time.getMinutes();
    const seconds = time.getSeconds().toString().length === 1 ? `0${time.getSeconds()}` : time.getSeconds();

    const timeString = `${hours}:${minutes}:${seconds}`;

    return (
        <div className={css.wrapper}>
        <p className={css.timeString}>{timeString}</p>
        </div>
    );
}