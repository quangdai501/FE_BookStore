import React from 'react';
import './style.scss';
export default function Toast(props) {
    const icons = {
        success: "far fa-check-circle",
        error: "fas fa-times"
    }
    return (
        <div className={`toast ${props.type}`}>
            <div className="toast__icon">
                <i class={`${icons[props.type]}`}></i>
            </div>
            <div className="toast__message">
                {props.message}
            </div>
        </div>
    )
}
