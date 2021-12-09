import React from "react";
import { priceToString } from "../../../common/convertNumberToPrice";
import Item from "../../Checkout/item";
import "./style.scss";
function Order(props) {
  const {_id, billDetail, name, address, phone, total, orderCode, payment, status } =props.order;
  return (
    <div class="order">
      <div class="order__header">
        <span>Order ID: {_id}</span>
      </div>
      <div class="order__info">
        <div class="info">
          <strong>Địa Chỉ</strong>
          <span>{address}</span>
        </div>
        <div class="info">
          <strong>Thông Tin Người Nhận</strong>
          <span>
            {name}, | <i class="fas fa-phone"></i> {phone}
          </span>
        </div>
        <div class="info">
          <strong>Tổng Đơn Hàng</strong>
          <span> {priceToString(total)} </span>
        </div>
        <div class="info">
          <strong>Hình Thức Thanh Toán</strong>
          <span> {payment} </span>
        </div>
        <div class="info">
          <strong>Trạng Thái</strong>
          <span>{status}</span>
        </div>
      </div>
      {billDetail.map((order, index) => (
                              <Item cart={order} key={index} />
                            ))}
    </div>
  );
}

export default Order;
