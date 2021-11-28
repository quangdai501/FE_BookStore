import "./style.scss";
import React from 'react'
import { priceToString } from "../../../common/convertNumberToPrice";

const Item = (props) => {
    const { image, name, price, qty } = props.cart
    const total = price * qty

    return (
        <div className="item row">
            <img className="col c-4" src={image} alt="Book" />
            <div className="subject col c-8">
                <p className="subject__name">{name}</p>
                <div className="row flex-row">
                    <p >{qty}<i class="fas fa-times"></i>{priceToString(price)}</p>
                    <p className="total-order">{priceToString(total)}</p>
                </div>
            </div>
        </div>
    )
}

export default Item
