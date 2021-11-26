import "./style.scss";
import React from 'react'

const Item = (props) => {
    const { image, title, price, qty } = props.cart
    const total = price * qty
    const priceToString = (price) => {
        return (price).toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
    }

    return (
        <div className="item row">
            <img className="col c-4" src={image} alt="Book" />
            <div className="subject col c-8">
                <h4>{title}</h4>
                <div className="row">
                    <p className="col c-6">{qty}<b>X</b>{priceToString(price)}</p>
                    <p className="col c-6">{priceToString(total)}</p>
                </div>
            </div>
        </div>
    )
}

export default Item
