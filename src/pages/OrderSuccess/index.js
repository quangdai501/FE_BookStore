import React from 'react';
import './style.scss';
import { Link, useLocation } from 'react-router-dom';
export default function OrderSuccess() {
    const { search } = useLocation();
    console.log(search);
    const responseCode = new URLSearchParams(search).get("vnp_ResponseCode");
    const paymentDetail = () => {
        const url = `https://sandbox.vnpayment.vn/tryitnow/Home/VnPayReturn${search}`
        window.location.href = url
    }
    return (
        <div className="row thankful space">
            {
                responseCode === "00" ?
                    <>
                        <div className="c-12 thankful-title">
                            <img src="./images/tick-yellow.png" alt="" srcset="" />
                            <h3>Đặt hàng thành công</h3>
                        </div>
                    </> : <div className="c-12 thankful-title">
                        <img src="./images/order-fail.png" alt="" srcset="" />
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
            <div className="c-12 thankful-action">
                <p onClick={paymentDetail} className="payment-detail">Chi tiết giao dịch</p>
            </div>
        </div>
    )
}
