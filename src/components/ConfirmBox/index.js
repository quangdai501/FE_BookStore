import React, { useState } from 'react';
import './style.scss';

export default function ConfirmBox(props) {
    const [close, setClose] = useState(false);
    const handleConfirmYes = () => {
        setClose(true);
        setTimeout(() => { props.handleConfirm("yes", props.confirm._id) }, 200)
    }
    const handleConfirmNo = () => {
        setClose(true);
        setTimeout(() => { props.handleConfirm("no") }, 200)
    }
    return (
        <div className={`confirm ${close ? "close" : ""}`}>
            <div className="confirm__body">
                <div className="confirm-message">
                    {`Bạn có muốn ${props.type} ${props.category} `}
                    <strong>{props.object} </strong>không?
                </div>
                <div className="confirm-option">
                    <button className="btn btn--border-none btn--color-blue" onClick={handleConfirmYes}>Đồng ý</button>
                    <button className="btn btn--border-none btn--color-red" onClick={handleConfirmNo}>Hủy</button>
                </div>
            </div>
        </div>
    )
}
