import React, { useState } from 'react';
import './style.scss';
export default function Toast(props) {
    const [show, setShow] = useState(true);
    const icons = {
        success: "far fa-check-circle",
        error: "fas fa-times"
    }
    setTimeout(() => { setShow(false) }, 3000)
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
