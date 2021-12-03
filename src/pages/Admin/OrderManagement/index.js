import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './style.scss';
import { getOrderByDeliveryStatus } from '../../../actions/orderAction';
import OrderDetail from './items/OrderDetail';
import { priceToString } from '../../../common/convertNumberToPrice';
import { adminApproveOrder } from '../../../actions/orderAction';
import Item from "../../Checkout/item/index";
export default function OrderManagement() {
    const [listOrders, setListOrders] = useState([]);
    const [show, setShow] = useState(0);
    const [change, setChange] = useState(false);
    const { orders, error } = useSelector(state => state.orderByStatus);

    const dispatch = useDispatch();
    const approveOrder = (id, action) => {
        dispatch(adminApproveOrder(id, action));
        setChange(!change);
    }
    const openModal = (id) => {
        if(id===show){
            setShow()
        }
        else{
            setShow(id);
        }
        
      };
    useEffect(() => {
        const setList = () => {
            const newList = orders?.reduce((list, curr) => {
                const newFormat = {
                    _id: curr._id,
                    name: curr.name,
                    address: `${curr.address.detail}, ${curr.address.ward}, ${curr.address.district}, ${curr.address.province}`,
                    phone: curr.phone,
                    billDetail: curr.billDetail,
                    total: curr.total,
                    orderCode: curr.orderCode,
                    payment: curr.payment
                }
                list.push(newFormat)
                return list
            }, []);
            setListOrders(newList);
        }
        setList();
    }, [orders])
    useEffect(() => {
        dispatch(getOrderByDeliveryStatus("Tất cả"))
    }, [change])
    return (
        <div className="container">
            <div class="manage-header">
                {/* <p class="manage-title">Đơn hàng chờ xử lý</p> */}
                <a href="https://5sao.ghn.dev/order">Quản lý đơn hàng tại giao hàng nhanh</a>
            </div>
            {error && <p>{error}</p>}

            {/* {listOrders && listOrders?.billDetail.map((detail) =>
                <OrderDetail
                    key={detail._id}
                    image={detail.image}
                    name={detail.name}
                    qty={detail.qty}
                    show={show}
                    id={detail._id}
                />)} */}

            <div className="table-scroll" >
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên người nhận</th>
                            <th style={{ width: '300px' }}>Địa chỉ</th>
                            <th>Điện thoại</th>
                            <th>Tổng đơn</th>
                            <th>Hình thức thanh toán</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listOrders ? listOrders.map((item, index) => (
                            item.orderCode === undefined &&
                            <>
                             <tr key={index} onClick={() => openModal(index)}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.address}</td>
                                <td>{item.phone}</td>
                                <td>{priceToString(item.total)}</td>
                                <td>{item.payment}</td>
                                <td>
                                    <div className="action">
                                        <p
                                            className="edit"
                                            title="Chỉnh sửa"
                                            onClick={() => approveOrder(item._id, "Duyet")}
                                        >
                                            Duyệt
                                        </p>
                                        <p
                                            className="edit"
                                            title="delete"
                                        >
                                            Hủy đơn
                                        </p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                    {show === index && (
                      <td colspan="6">
                        <div className="row center-item">
                          <div className="col c-8 md-12">
                            {item.billDetail.map((order, index) => (
                              <Item cart={order} key={index} />
                            ))}
                          </div>
                        </div>
                      </td>
                    )}
                  </tr>
                            </>
                           
                        )) : <>
                        </>}
                    </tbody>
                </table>
                {listOrders?.length !== 0 && <p className="order-empty">Không có đơn nào cần xử lý</p>}
            </div>
        </div>
    )
}
