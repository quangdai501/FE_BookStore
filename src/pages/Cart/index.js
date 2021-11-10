import React from "react";
import CartItem from "../../components/CartItem";
import { Link } from "react-router-dom";
import "./style.scss";
const Cart = () => {
  const cart = [
    {
      title: "Yêu Em Bằng Mắt, Giữ Em Bằng Tim",
      image:
        "https://www.vinabook.com/images/thumbnails/product/240x/366437_p93863mnxbtredocyeuembangmatgiuembangtimpage001.jpg",
      price: 140000,
      quantity: 1,
    },
    {
      title: "Yêu Em Bằng Mắt, Giữ Em Bằng Tim",
      image:
        "https://www.vinabook.com/images/thumbnails/product/240x/366437_p93863mnxbtredocyeuembangmatgiuembangtimpage001.jpg",
      price: 140000,
      quantity: 1,
    },
    {
      title: "Yêu Em Bằng Mắt, Giữ Em Bằng Tim",
      image:
        "https://www.vinabook.com/images/thumbnails/product/240x/366437_p93863mnxbtredocyeuembangmatgiuembangtimpage001.jpg",
      price: 140000,
      quantity: 2,
    },
  ];
  return (
    <div>
      <h1>Cart</h1>
      <div className="cart row">
        <div className="list-item col c-6 md-12">
          {cart.map((item, index) => (
            <CartItem cart={item} key={index} />
          ))}
        </div>
        <div className="Orders col c-4 md-12">
            <div className="order-row">
              <div className="row">
                <h3 className="title col c-8">Tổng Giỏ hàng</h3>
                <div className="col c-4">100.000</div>
              </div>
            </div>
            
            <div className="order-row">
              <button
                className="btn btn--border-none btn--full-width"
                type="submit"
              >
                {/* <Link to="/checkout">Đến trang đặt hàng</Link> */}
                Đến trang đặt hàng
              </button>
            </div>
          
           
        </div>
      </div>
    </div>
  );
};

export default Cart;
