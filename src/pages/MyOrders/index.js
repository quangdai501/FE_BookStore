import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrderOfUser } from "../../actions/orderAction";
import { priceToString } from "../../common/convertNumberToPrice";
import Item from "../Checkout/item";
import Order from "./Item/index";
import './style.scss'
const MyOrders = () => {
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
    <div className="my-order">
      {listOrders ? (
              listOrders.map((item, index) => (
                <div className="card">
                    <Order key={index} order={item}/>          
                </div>
              ))):<></>
      }
    
      
    </div>
  );
};

export default MyOrders;
