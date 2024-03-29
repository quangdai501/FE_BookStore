import React, { useRef, useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import "./style.scss";
import useClickOutside from '../../hooks/useClickOutside';
export default function Modal({ children, openHandler, visible }) {
    const mainRef = useRef(null);
    const [openModal, setOpenModal] = useState(false);
    useClickOutside(mainRef, () => openHandler());
    useEffect(() => {
        if (visible) {
            setOpenModal(true);
        }
        else {
            setOpenModal(false);
        }
    }, [visible])

    return ReactDOM.createPortal(
        <div className={`modal-common ${openModal ? "active" : ""}`}>
            <div className="modal-container" ref={mainRef}>
                <div className="modal-close-icon" onClick={() => openHandler()}>
                    <i class="far fa-times-circle"></i>
                </div>
                {children}
            </div>
        </div>, document.getElementById("portal"))

}
