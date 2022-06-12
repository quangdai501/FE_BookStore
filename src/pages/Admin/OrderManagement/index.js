import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './style.scss';
import { getOrderByDeliveryStatus } from '../../../actions/orderAction';
import { priceToString } from '../../../common/convertNumberToPrice';
import { adminApproveOrder } from '../../../actions/orderAction';
import Toast from '../../../components/Toast';
import Item from "../../Checkout/item/index";
import TableLoading from '../../../components/TableLoading';
import Modal from '../../../components/Modal';
import { ORDER_RESET } from '../../../constants/order';

const TIME_OUT = 5000;
export default function OrderManagement() {
    const [listOrders, setListOrders] = useState([]);
    const [show, setShow] = useState();
    const [change, setChange] = useState(false);
    const [action, setAction] = useState("");
    const [currId, setCurrId] = useState("");
    const { orders, error, loading, approveMessage, approving } = useSelector(state => state.orderByStatus);
    const [currentStatus, setCurrentStatus] = useState('');
    const timeoutRef = useRef();

    const dispatch = useDispatch();
    const approveOrder = async (id, action) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            dispatch({ type: ORDER_RESET });
        }
        setAction(action);
        setCurrId(id);
        await dispatch(adminApproveOrder(id, action));
        setChange(true);
        timeoutRef.current = setTimeout(() => dispatch({ type: ORDER_RESET }), TIME_OUT);
    }
    const openModal = (id) => {
        if (id === show) {
            setShow()
        }
        else {
            setShow(id);
        }
    };

    const handleOnChange = (e) => {
        setCurrentStatus(e.target.value);
    }

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
                    payment: curr.payment,
                    deliveryStatus: curr.deliveryStatus
                }
                list.push(newFormat)
                return list
            }, []);
            setListOrders(newList);
        }
        setList();
    }, [orders])

    useEffect(() => {
        if (!currentStatus)
            dispatch(getOrderByDeliveryStatus("Đang chờ xử lý"));
        else {
            dispatch(getOrderByDeliveryStatus(currentStatus));
        }
    }, [currentStatus])

    return (
        <div className="container">
            {error && change && <Toast message={error} type={"error"} />}
            {approveMessage && change && < Toast message={approveMessage} type={"success"} />}
            <div class="manage-header">
                <a href="https://5sao.ghn.dev/order" className="ghn-link" title="Đi tới giao hàng nhanh"><img src="../../images/ghn_logo.png" alt="" height="30" /></a>
            </div>
            <div className="table-scroll" >
                <table>
                    <thead>
                        <tr>
                            <th style={{ minWidth: '60px' }}>STT</th>
                            <th style={{ minWidth: '150px' }}>Tên người nhận</th>
                            <th style={{minWidth: '550px', maxWidth: '550px' }}>Địa chỉ</th>
                            <th>Điện thoại</th>
                            <th>Tổng đơn</th>
                            <th style={{ minWidth: '150px' }}>Hình thức thanh toán</th>
                            <th>
                                <select name="" onChange={handleOnChange}>
                                    <option defaultValue="Đang chờ xử lý">Đang chờ xử lý</option>
                                    <option value="Tất cả">Tất cả</option>
                                    <option value="Chờ vận chuyển">Chờ vận chuyển</option>
                                    <option value="Đã giao">Đã giao</option>
                                    <option value="Đã hủy">Đã hủy</option>
                                </select>
                            </th>
                            <th style={{ minWidth: '120px' }}>Chi tiết đơn</th>
                            <th style={{ minWidth: '160px' }}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && <TableLoading />}
                        {listOrders ? listOrders.map((item, index) => {
                            const hasAction = item.deliveryStatus === "Đang chờ xử lý";
                            return <>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.address}</td>
                                    <td>{item.phone}</td>
                                    <td>{priceToString(item.total)}</td>
                                    <td>{item.payment}</td>
                                    <td>{item.deliveryStatus}</td>
                                    <td>
                                        <button
                                            className="btn btn--no-border order-detail-item btn--color-second"
                                            title="Chi tiết"
                                            onClick={() => openModal(index)}
                                        >
                                            Chi tiết đơn
                                        </button></td>
                                    <td>
                                        <div className="action">
                                            <button
                                                disabled={!hasAction}
                                                className="btn btn--no-border approve"
                                                title="Duyệt"
                                                onClick={() => approveOrder(item._id, "Duyet")}
                                            >
                                                {(approving && action === "Duyet" && currId === item._id) ? "Xử lý..." : "Duyệt"}
                                            </button>
                                            <button
                                                disabled={!hasAction}
                                                className="btn btn--no-border cancel ml-15"
                                                title="Hủy"
                                                onClick={() => approveOrder(item._id, "Huy")}
                                            >
                                                {(approving && action === "Huy" && currId === item._id) ? "Xử lý..." : "Hủy đơn"}
                                            </button>
                                        </div>
                                    </td>
                                    {show === index &&
                                        <Modal
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
                                        </Modal>}
                                </tr>
                            </>
                        }
                        ) : <>
                        </>}
                    </tbody>
                </table >
                {listOrders?.length === 0 && <p className="order-empty"><img src="../../images/empty-order.png" alt="" /></p>}
            </div >
        </div >
    )
}
