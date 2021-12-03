import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
export default function OrderSuccess() {
    return (
        <div className="row thankful space">
            <div className="c-12 thankful-title">
                <img src="./images/tick-yellow.png" alt="" srcset="" />
                <h3>Đặt hàng thành công</h3>
            </div>
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
