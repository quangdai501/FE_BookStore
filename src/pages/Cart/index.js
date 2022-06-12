import React from "react";
import CartItem from "../../components/CartItem";
import { useNavigate } from "react-router";
import "./style.scss";
import { useSelector } from "react-redux";
import { priceToString } from "../../common/convertNumberToPrice";
const Cart = () => {
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const { userInfo } = useSelector(state => state.userLogin);
  const totalCart = cartItems.reduce((s, i) => s + (i.qty * i.price), 0)
  let navigate = useNavigate();
  const gotoCheckout = () => {
    if (userInfo?.email) {
      navigate("/checkout");
    } else {
      navigate("/login?redirect=/checkout");
    }
  };
  return (
    <div className="space">
      <h1 className="cart-header">Giỏ hàng của bạn</h1>
      <div className="row gutter">
        {cartItems.length === 0 ? <div className="c-12">
          <div className="empty-cart"><img src="./images/empty-cart.png" alt="Empty" /></div>
        </div>
          : <><div className="c-8 md-12 padding">
            {cartItems.map((item, index) => (
              <CartItem cart={item} key={index} />
            ))}
          </div>
            <div className="c-4 md-12 padding">
              <div className="Orders shadow">
                <div className="order-row">
                  <div className="row">
                    <h3 className="title col c-8 lg-12">Tổng Giỏ hàng:</h3>
                    <div className="col c-4 lg-12">{priceToString(totalCart)}</div>
                  </div>
                </div>
                <div className="order-row">
                  <button
                    className="btn btn--border-none btn--full-width btn--padding"
                    type="submit"
                    onClick={gotoCheckout}
                  >
                    {/* <Link to="/checkout">Đến trang đặt hàng</Link> */}
                    Đến trang đặt hàng
                  </button>
                </div>
              </div>
            </div>
          </>}
      </div>
    </div>
  );
};

export default Cart;
