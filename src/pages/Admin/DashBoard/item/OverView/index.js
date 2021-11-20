import React from 'react';
import './style.scss';

export default function OverView() {
    return (
        <div className="container">
            <div className="row overview">
                <div className="c-3 padding">
                    <div className="row overview__item">
                        <div className="c-3">
                            <i class="fas fa-book"></i>
                        </div>
                        <div className="c-9">
                            Số sản phẩm: 100
                        </div>
                    </div>
                </div>
                <div className="c-3 padding">
                    <div className="row overview__item">
                        <div className="c-3">
                            <i class="fas fa-users"></i>
                        </div>
                        <div className="c-9">
                            Số người dùng: 200
                        </div>

                    </div>
                </div>
                <div className="c-3 padding">
                    <div className="row overview__item">
                        <div className="c-3">
                            <i class="fas fa-dollar-sign"></i>
                        </div>
                        <div className="c-9">
                            Doanh thu hàng tháng
                        </div>

                    </div>
                </div>
                <div className="c-3 padding">
                    <div className="row overview__item">
                        <div className="c-3">
                            <i class="fas fa-clipboard-list"></i>
                        </div>
                        <div className="c-9">
                            Tổng số đơn hàng
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
