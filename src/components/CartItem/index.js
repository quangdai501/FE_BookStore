import React, { useState } from "react";
import "./style.scss";

export default function CartItem(props) {
  
  const {image,title,price}=props.cart
   
    const [quantity,setQuantity]=useState(()=>{return props.cart.quantity})
    const priceToString=(price)=>{
        return (price).toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }); 
    }
    const changeQuantity=(payload)=>{
        if(quantity+payload>0){
          setQuantity(quantity+payload)
        }
       
    }
  return(
    <div className="cart-item">
        <img src={image} alt={title} className="cart-item__img" />
        <div className="sub">
              <p className="cart-item__title">{title}</p>
            <p className="cart-item__price">{priceToString(price)}</p>
            <div className="sub-row">
              <div className="cart-item__quantity ">
                  <button onClick={()=>changeQuantity(-1)}>-</button>
                  <input type="text" value={quantity} min="0" pattern="[0-9]" title="Số lượng sản phẩm"/>
                  <button onClick={()=>changeQuantity(+1)}>+</button>
              </div>
              <p className="cart-item__total ">{priceToString(price*quantity)}</p>
            </div>
        </div>
        <p className="cart-item__close">X</p>
     

    </div>
  )
}
