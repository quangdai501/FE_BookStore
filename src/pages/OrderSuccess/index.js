import React, { useEffect } from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { deleteOrder } from '../../actions/orderAction';
import { CART_CLEAR_ITEMS } from '../../constants/cart';
import { sendMailOrder } from '../../actions/orderAction';
export default function OrderSuccess() {
    const { search } = useLocation();
    const dispatch = useDispatch();
    const responseCode = new URLSearchParams(search).get("vnp_ResponseCode");
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const { userInfo } = useSelector((state) => state.userLogin);

    useEffect(() => {
        const orderSuccess = async () => {
            if (cartItems.length !== 0) {
                await dispatch(sendMailOrder(userInfo, cartItems));
                await dispatch({ type: CART_CLEAR_ITEMS });
            }
        }
        if (search && responseCode === "00") {
            orderSuccess();
        }
        if (search && responseCode !== "00") {
            dispatch(deleteOrder(search))
        }
    }, [search])
    return (
        <div className="row thankful space">
            {
                responseCode === "00" || !search ?
                    <>
                        <div className="c-12 thankful-title">
                            <img src="./images/tick-yellow.png" alt=""  />
                            <h3>Đặt hàng thành công</h3>
                        </div>
                    </> : <div className="c-12 thankful-title">
                        <img src="./images/order-fail.png" alt=""  />
                        <h3>Đặt hàng không thành công</h3>
                    </div>
            }
            <div className="c-12 thankful-action">
                <div className="row">
                    <div className="md-12 thankful-action">
                        <Link to="/shop" className="btn btn--border-none">Tiếp tục mua hàng</Link>
                    </div>
                    <div className="md-12 thankful-action">
                        <Link to="/myorder" className="btn btn--border-none">Lịch sử mua hàng</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
