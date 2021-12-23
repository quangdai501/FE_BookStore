import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './style.scss';
import { getOrderByDeliveryStatus } from '../../../actions/orderAction';
import { priceToString } from '../../../common/convertNumberToPrice';
import { adminApproveOrder } from '../../../actions/orderAction';
import Toast from '../../../components/Toast';
import Item from "../../Checkout/item/index";
import Loading from '../../../components/Loading';
import Model from '../../../components/Model';
export default function OrderManagement() {
    const [listOrders, setListOrders] = useState([]);
    const [show, setShow] = useState();
    const [change, setChange] = useState(false);
    const [action, setAction] = useState("");
    const [currId, setCurrId] = useState("");
    const { orders, error, loading } = useSelector(state => state.orderByStatus);
    const { orders: orderApprove, error: approveError, loading: loadingApprove } = useSelector(state => state.orderApprove);

    const dispatch = useDispatch();
    const approveOrder = async (id, action) => {
        setAction(action);
        setCurrId(id);
        await dispatch(adminApproveOrder(id, action));
        await dispatch(getOrderByDeliveryStatus("Đang chờ xử lý"))
        setChange(true);
    }
    const openModal = (id) => {
        if (id === show) {
            setShow()
        }
        else {
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
        dispatch(getOrderByDeliveryStatus("Đang chờ xử lý"))
    }, [])
    return (
        <div className="container">
            {approveError && change && <Toast message={approveError.message} type={"error"} />}
            {orderApprove && change && < Toast message={orderApprove} type={"success"} />}
            <div class="manage-header">
                <a href="https://5sao.ghn.dev/order" className="ghn-link" title="Đi tới giao hàng nhanh"><img src="../../images/ghn_logo.png" alt="" height="30" /></a>
            </div>
            {loading ? <Loading /> : <>
                {listOrders?.length === 0 ? <p className="order-empty"><img src="../../images/empty-order.png" alt="" /></p> :
                    <div className="table-scroll" >
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ minWidth: '60px' }}>STT</th>
                                    <th>Tên người nhận</th>
                                    <th style={{ maxWidth: '200px', minWidth: '200px' }}>Địa chỉ</th>
                                    <th>Điện thoại</th>
                                    <th>Tổng đơn</th>
                                    <th>Hình thức thanh toán</th>
                                    <th style={{ minWidth: '120px' }}>Chi tiết đơn</th>
                                    <th style={{ minWidth: '160px' }}>Thao tác</th>
                                    <th style={{ width: '0' }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {listOrders ? listOrders.map((item, index) => (
                                    <>
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.address}</td>
                                            <td>{item.phone}</td>
                                            <td>{priceToString(item.total)}</td>
                                            <td>{item.payment}</td>
                                            <td>
                                                <p
                                                    className="order-detail-item btn--color-second"
                                                    title="Chi tiết"
                                                    onClick={() => openModal(index)}
                                                >
                                                    Chi tiết đơn
                                                </p></td>
                                            <td>
                                                <div className="action">
                                                    <p
                                                        className="approve"
                                                        title="Duyệt"
                                                        onClick={() => approveOrder(item._id, "Duyet")}
                                                    >
                                                        {(loadingApprove && action === "Duyet" && currId === item._id) ? "Xử lý..." : "Duyệt"}
                                                    </p>
                                                    <p
                                                        className="cancel ml-15"
                                                        title="Hủy"
                                                        onClick={() => approveOrder(item._id, "Huy")}
                                                    >
                                                        {(loadingApprove && action === "Huy" && currId === item._id) ? "Xử lý..." : "Hủy đơn"}
                                                    </p>

                                                </div>
                                            </td>
                                            <td>
                                                {show === index &&
                                                    <Model
                                                        openHandler={openModal}
                                                        visible={show === index}
                                                        id={index}
                                                    >
                                                        <div className="row center-item">
                                                            <h4 className="detail-title">
                                                                Danh sách sản phẩm
                                                            </h4>
                                                            <p className="detail-total">Tổng số: <strong>{item.billDetail.length}</strong> cuốn sách</p>
                                                        </div>
                                                        <div className="row center-item">
                                                            <div className="c-12">
                                                                {item.billDetail.map((order, index) => (
                                                                    <div key={index}>
                                                                        <Item cart={order} />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </Model>}
                                            </td>
                                        </tr>
                                    </>
                                )) : <>
                                </>}

                            </tbody>
                        </table >
                    </div >
                }</>}
            {error && <p className="login__error">{error}</p>}
        </div >
    )
}
