import React, { useEffect, useState } from 'react'
import StatisticApi from '../../../../api/statisticApi';
import { priceToString } from '../../../../common/convertNumberToPrice';
import './style.scss'
function Total() {
    const [data, setData] = useState();
    useEffect(() => {

    const fetchData = async () => {
        try {
            const result = await StatisticApi.getAll()
            setData(result.data);
        } catch (error) {
            console.log(error)
        }
    
    };

    fetchData();
  }, []);
    return (
        <div className='total'>
            <div className="card">
                <div className="total-item">
                    <div className="total-item__icon">
                        <i class="fas fa-book"></i>
                    </div>
                    <div className="total-item__info">
                        <p className="total-item__info-title">Số sản phẩm</p>
                        <p className="total-item__info-total">{data?.totalProduct||0}</p>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="total-item">
                    <div className="total-item__icon">
                    <i class="fas fa-users"></i>
                    </div>
                    <div className="total-item__info">
                        <p className="total-item__info-title">Số người dùng</p>
                        <p className="total-item__info-total">{data?.totalUser||0}</p>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="total-item">
                    <div className="total-item__icon">
                    <i class="fas fa-dollar-sign"></i>
                    </div>
                    <div className="total-item__info">
                        <p className="total-item__info-title">Tổng số doanh thu</p>
                        <p className="total-item__info-total">{priceToString(data?.revenueOrder||0)}</p>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="total-item">
                    <div className="total-item__icon">
                    <i class="fas fa-clipboard-list"></i>
                    </div>
                    <div className="total-item__info">
                        <p className="total-item__info-title">Tổng số đơn hàng</p>
                        <p className="total-item__info-total"> {data?.totalOrder||0}</p>
                    </div>
                </div>
            </div>
           
        </div>
    )
}

export default Total
