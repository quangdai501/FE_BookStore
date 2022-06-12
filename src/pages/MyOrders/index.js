import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listOrderOfUser } from "../../actions/orderAction";
import Order from "./Item/index";
import "./style.scss";

const MyOrders = () => {
  const listStatus = ["Tất cả", "Chờ xử lý", "Đang giao", "Đã giao", "Đã hủy"];
  const [statusActive, setStatusActive] = useState(0);
  const [listOrders, setListOrders] = useState([]);

  const { orders, error } = useSelector((state) => state.userOrder);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderOfUser(statusActive));
  }, [statusActive]);
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
          status: curr.deliveryStatus,
          createdAt: curr.createdAt,
        };
        list.push(newFormat);
        return list;
      }, []);
      setListOrders(newList);
    };
    setList();
  }, [orders]);

  const onChangeStatus = (e) => {
    setStatusActive(e.target.value)
  }
  return (
    <div className="my-order space">
      <div className="sticky card">
        <div className="status-container">
          {listStatus.map((item, index) => (
            <button
              onClick={() => setStatusActive(index)}
              className={
                index === statusActive ? "status status--active" : "status"
              }
            >
              {item}
            </button>
          ))}
        </div>
        <div className="status-container--mobile">
          <select name="status" onChange={onChangeStatus}>
            {listStatus.map((item, index) => (
              <option selected={index === statusActive} value={index}>Trạng thái đơn hàng: {item}</option>
            ))}
          </select>
        </div>
      </div>
      {listOrders && listOrders.length > 0 ? (
        listOrders.map((item, index) => (
          <div className="card" key={index}>
            <Order order={item} />
          </div>
        ))
      ) : (
        <div className="row center-item">
          <div className="empty-order row">
            <img src="./images/empty-order.png" alt="Empty" />
            <p>Đơn hàng của bạn hiện đang trống</p>
            <Link to="/shop" className="btn btn--border-none">
              Tiếp tục mua hàng
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
