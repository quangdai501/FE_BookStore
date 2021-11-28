import React from 'react';
import './style.scss';
export default function OrderDetailItem(props) {
    return (
        <div className="row">
            <div className="c-3">
                <img className="detail-img" src={props.image} alt="Img" />
            </div>
            <div className="c-4">
                <p className="detail-name">
                    {props.name}
                </p>
            </div>
            <div className="c-2">
                <p className="detail-price">
                    {props.price}
                </p>
            </div>
            <div className="c-3">
                <p className="detail-qty">
                    {props.qty}
                </p>
            </div>
        </div>
    )
}
