import React from "react";
import CartItem from "../../components/CartItem";
import { useNavigate } from "react-router";
import "./style.scss";
import { useSelector } from "react-redux";
import { priceToString } from "../../common/convertNumberToPrice";
const Cart = () => {
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const totalCart = cartItems.reduce((s, i) => s + (i.qty * i.price), 0)
  let navigate = useNavigate();
  const gotoCheckout = () => {
    navigate("/checkout");
  };
  return (
    <div className="space">
      <h1 className="cart-header">Giỏ hàng của bạn</h1>
      <div className="row gutter">
        <div className="c-8 md-12 padding">
          {cartItems.length !== 0 ? cartItems.map((item, index) => (
            <CartItem cart={item} key={index} />
          )) : <div className="empty-cart"><img src="./images/empty-cart.png" alt="Empty" /></div>}
        </div>
        <div className="c-4 md-12 padding">
          <div className="Orders">
            <div className="order-row">
              <div className="row">
                <h3 className="title col c-8">Tổng Giỏ hàng:</h3>
                <div className="col c-4">{priceToString(totalCart)}</div>
              </div>
            </div>
            <div className="order-row">
              <button
                className="btn btn--border-none btn--full-width"
                type="submit"
                onClick={gotoCheckout}
              >
                {/* <Link to="/checkout">Đến trang đặt hàng</Link> */}
                Đến trang đặt hàng
              </button>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Cart;
