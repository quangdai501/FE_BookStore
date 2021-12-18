import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrderOfUser } from "../../actions/orderAction";
import { priceToString } from "../../common/convertNumberToPrice";
import Item from "../Checkout/item";
import Order from "./Item/index";
import "./style.scss";


const MyOrders = () => {
  const [listStatus, setListStatus] = useState([
    "Tất cả","Chờ xử lý","Đang giao","Đã giao","Đã hủy"
  ])
  const [statusActive, setStatusActive] = useState(0)
  const [listOrders, setListOrders] = useState([]);

  const { orders, error } = useSelector((state) => state.userOrder);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderOfUser());
  }, []);
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
        };
        list.push(newFormat);
        return list;
      }, []);
      setListOrders(newList);
    };
    setList();
  }, [orders]);

  return (
    <div className="my-order space">
      <div className="sticky card">
        {listStatus.map((item,index)=>
          (<div onClick={()=>setStatusActive(index)} className={index===statusActive?"status status--active":"status"}>{item}</div>)
        )}
        {/* <div className="status status--active">Tất cả</div>
        <div className="status">Chờ xử lý</div>
        <div className="status">Đang giao</div>
        <div className="status">Đã giao</div>
        <div className="status">Đã hủy</div> */}
      </div>
      {listOrders ? (
        listOrders.map((item, index) => (
          <div className="card" key={index}>
            <Order order={item} />
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default MyOrders;
