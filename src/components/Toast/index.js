import React, { useState, useEffect } from 'react';
import './style.scss';
export default function Toast(props) {
    const [show, setShow] = useState(true);
    const icons = {
        success: "far fa-check-circle",
        error: "fas fa-times"
    }
    useEffect(() => {
        setTimeout(() => { setShow(false) }, 3000)
        return () => clearTimeout();
    }, [])
    return <>
        {
            show ?
                <div className={`toast ${props.type}`}>
                    <div className="toast__icon">
                        <i class={`${icons[props.type]}`}></i>
                    </div>
                    <div className="toast__message">
                        {props.message}
                    </div>
                </div> : <></>
        }
    </>
}
