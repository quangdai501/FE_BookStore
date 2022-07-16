import React from "react";
import ReactModal from "react-modal";
import { Line } from "rc-progress";
import { useQuery } from "react-query";

import { priceToString } from "../../../../common/convertNumberToPrice";
import {
  convertPointToUserRank,
} from "../../../../common/discount.common";
import "./style.scss";
import couponApi from "../../../../api/couponApi";

const customStyles = {
  content: {
    top: "10%",
    left: "10%",
    bottom: "10%",
    right: "10%",
    height: "80vh",
    "overflow-y": "scroll",
  },
};

function CouponModal(props) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const { data } = useQuery("repoData", () => couponApi.getAll());

  function openModal() {
    setIsOpen(true);
  }

  function closeModal(code) {
    setIsOpen(false);
  }
  return (
    <div className="coupon-modal">
      <button  className="open-coupon-modal"  onClick={openModal}>{"Tìm kiếm mã giảm giá >>"}</button>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modal-container">
          {data?.data &&
            data.data.map((item, index) => (
              <div className="modal-item">
                <img
                  src={
                    "https://cdn-icons-png.flaticon.com/512/1874/1874938.png"
                  }
                  className="modal-item__img"
                />
                <div className="sub">
                  <p>{item.description}</p>
                  <p>Từ: <span>{new Date(item.begin).toLocaleString()}</span></p>
                  <p>Đến: <span>{new Date(item.end).toLocaleString()}</span></p>
                  <p>
                    Giảm{" "}
                    <span>
                      {item.discount_type === "NUMBER"
                        ? priceToString(item.discount)
                        : `${item.discount} %`}
                    </span>
                    , tối đa: <span>{priceToString(item.max_discount)}</span>
                  </p>
                  <p>
                    Điều kiện: Khi mua đơn hàng từ{" "}
                    <span>{priceToString(item.min_order)}</span>
                  </p>
                  <p>
                    Áp dụng cho khách hàng{" "}
                    <span>{convertPointToUserRank(item.point_condition)}</span>
                  </p>
                  <div className="btn-container">
                    <p>Mã: <span>{item.code}</span></p>
                 
                    <button className="use-btn" onClick={() => closeModal(item.code)}>
                     {" Sử dụng >>"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </ReactModal>
    </div>
  );
}

export default CouponModal;
