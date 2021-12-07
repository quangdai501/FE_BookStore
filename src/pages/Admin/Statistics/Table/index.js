import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import StatisticApi from '../../../../api/statisticApi';
import { priceToString } from '../../../../common/convertNumberToPrice';
import './style.scss'
function Table() {
    const [topProduct, setTopProduct] = useState([]);
    const [newReviews, setnewReviews] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resTopProducts = await StatisticApi.getTopSaleProduct()
                setTopProduct(resTopProducts.data);
                const resNewReviews = await StatisticApi.getNewReviews()
                setnewReviews(resNewReviews.data);
            } catch (error) {
                console.log(error)
            }
         
        };
    
        fetchData();
  }, []);


    return (
        <div className="table">
            <div className="row">
                    <div className="c-12 table-scroll">
                    <table>
                        <thead>
                        <tr>
                            <th>Tên sản phẩm</th>
                            <th>Số lượng đã bán</th>
                            <th>Tổng doanh thu</th>
                        </tr>
                        </thead>
                        <tbody>
                        { topProduct.map((item,index)=>(
                        <tr key={index}>
                            <td>{item.productName}</td>
                            <td>{item.sales}</td>
                            <td>{priceToString(item.amount)}</td>
                        </tr>))}
                        </tbody>
                    </table>
                    </div>
                
            </div>
            <div className="row">
                    <div className="c-12 table-scroll">
                    <table>
                        <thead>
                        <tr>
                            <th>Tên người dùng</th>
                            <th>Bình luận</th>
                            <th>Sao</th>
                            <th>Thời gian</th>
                            <th>Sản phẩm</th>
                        </tr>
                        </thead>
                        <tbody>
                        { newReviews.map((item,index)=>(
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.comment}</td>
                            <td>{item.rating}</td>
                            <td>{item.updatedAt.replace('T',' ').replace('Z','')}</td>
                            <td><Link to={`/product-detail/${item.product}`}>{item.productName}</Link></td>
                        </tr>))}
                        </tbody>
                    </table>
                    </div>
                
            </div>
        </div>
       
    )
}

export default Table
