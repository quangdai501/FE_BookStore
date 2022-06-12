import React, { useState, useEffect } from 'react';
import './style.scss';
export default function Toast({ type, position, message,  }) {
    const [show, setShow] = useState(true);

    const icons = {
        success: "far fa-check-circle",
        error: "fas fa-times"
    }

    const onAnimationEnd = () => {
            setShow(false);
    }

    useEffect(() => {
        return () => {
            setShow(false);
        };
    }, [])
    return <>
        {
            show &&
            <div className={`toast ${type} ${position}`} onAnimationEnd={onAnimationEnd}>
                <div className="toast__icon">
                    <i class={`${icons[type]}`}></i>
                </div>
                <div className="toast__message">
                    {message}
                </div>
            </div>
        }
    </>
}
