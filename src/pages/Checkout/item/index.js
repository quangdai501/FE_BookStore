import "./style.scss";
import React from 'react'
import { priceToString } from "../../../common/convertNumberToPrice";

const Item = (props) => {
    const {image,name,price,qty}=props.cart
    const total=price*qty
    
    return (
        <div className="item row">
                <img className="col c-4" src={image}  />          
                <div className="subject col c-8">
                    <h4>{name}</h4>
                    <div className="row flex-row">

                        <p >{qty}<b>X</b>{priceToString(price)}</p>
                        <p >{priceToString(total)}</p>
                    </div>                
                </div>               
        </div>
    )
}

export default Item
