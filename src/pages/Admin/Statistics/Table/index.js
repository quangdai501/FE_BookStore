import React, { useEffect, useState } from 'react'
import StatisticApi from '../../../../api/statisticApi';
import { priceToString } from '../../../../common/convertNumberToPrice';
import Comment from '../../../../components/Comment';
import './style.scss'
function Table() {
    const [topProduct, setTopProduct] = useState([]);
    const [newReviews, setnewReviews] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resTopProducts = await StatisticApi.getTopSaleProduct()
                setTopProduct(resTopProducts.data);
                const resNewReviews = await StatisticApi.getNewReviews({ size: 5 })
                setnewReviews(resNewReviews.data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);


    return (
        <div className="statistic-table">
            <div className="card">
                <div className="review">
                    <h3 className="review-title">Đánh Giá - Nhận Xét Mới Nhất</h3>
                    {newReviews.map((item, index) => <Comment key={index} review={item} />)}
                </div>
            </div>
            <div className="row">
                <div className="c-12 table-scroll">
                    <div className="statistic-table__header">
                        <h3 className="review-title">Sản Phẩm Bán Chạy</h3>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Tên sản phẩm</th>
                                <th style={{ width: '80px' }}>Đã bán</th>
                                <th>Tổng doanh thu</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topProduct.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.productName}</td>
                                    <td>{item.sales}</td>
                                    <td>{priceToString(item.amount)}</td>
                                </tr>))}
                        </tbody>
                    </table>
                </div>

            </div>

        </div>

    )
}

export default Table
