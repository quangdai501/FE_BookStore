import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../actions/cartAction";
import { priceToString } from "../../common/convertNumberToPrice";
import "./style.scss";

export default function CartItem(props) {
  const { image, name, price, qty, product } = props.cart
  const dispatch = useDispatch()


  const removeFromCartHandler = () => {
    dispatch(removeFromCart(product))
  }


  const changeQuantity = (payload) => {
    if (qty + payload > 0) {
      dispatch(addToCart(product, qty + payload))
    }

  }
  return (
    <div className="cart-item">
      <img src={image} alt={name} className="cart-item__img" />
      <div className="sub">
        <p className="cart-item__title">{name}</p>
        <p className="cart-item__price">{priceToString(price)}</p>
        <div className="sub-row">
          <div className="cart-item__quantity ">
            <button onClick={() => changeQuantity(-1)}>-</button>
            <input type="text" value={qty} min="0" pattern="[0-9]" title="Số lượng sản phẩm" />
            <button onClick={() => changeQuantity(+1)}>+</button>
          </div>
          <p className="cart-item__total ">{priceToString(price * qty)}</p>
        </div>
      </div>
      <p onClick={removeFromCartHandler} className="cart-item__close">X</p>
    </div>
  )
}
