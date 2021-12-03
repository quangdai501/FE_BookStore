import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrderOfUser } from "../../actions/orderAction";
import { priceToString } from "../../common/convertNumberToPrice";
import Item from "../Checkout/item";

const MyOrders = () => {
  const [listOrders, setListOrders] = useState([]);
  const [show, setShow] = useState(0);
  const openModal = (id) => {
    if(id===show){
        setShow()
    }
    else{
        setShow(id);
    }
    
  };

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
        };
        list.push(newFormat);
        return list;
      }, []);
      setListOrders(newList);
    };
    setList();
  }, [orders]);

  return (
    <div className="container">
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên người nhận</th>
              <th style={{ width: "300px" }}>Địa chỉ</th>
              <th>Điện thoại</th>
              <th>Tổng đơn</th>
              <th>Hình thức thanh toán</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {listOrders ? (
              listOrders.map((item, index) => (
                <>
                  <tr key={index} onClick={() => openModal(index)}>
                    <td rowspan="2">{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.address}</td>
                    <td>{item.phone}</td>
                    <td>{priceToString(item.total)}</td>
                    <td>{item.payment}</td>
                    <td></td>
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
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
        {/* {listOrders?.length !== 0 && <p className="order-empty">Không có đơn nào cần xử lý</p>} */}
      </div>
    </div>
  );
};

export default MyOrders;
