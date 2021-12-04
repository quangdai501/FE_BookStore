import React from 'react';
import './style.scss';
export default function Toast(props) {
    const icons = {
        success: "far fa-check-circle",
        error: "fas fa-times"
    }
    return (
        <div className={`toast row ${props.type}`}>
            <div className="toast__icon c-2">
                <i class={`${icons[props.type]}`}></i>
            </div>
            <div className="toast__message c-10">
                {props.message}
            </div>
        </div>
    )
}
