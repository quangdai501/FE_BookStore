import React, { useState } from "react";
import { Line } from "rc-progress";
import { useQuery } from "react-query";

import { priceToString } from "../../../../common/convertNumberToPrice";
import {
  calculateRankUser,
  convertPointToUserRank,
  getUserRank,
  userRanks,
} from "../../../../common/discount.common";
import "./style.scss";
import couponApi from "../../../../api/couponApi";
import { Link } from "react-router-dom";

function UserRank(props) {
  const { point } = props;
  const [current, next] = getUserRank(point);
  const [isOpen, setIsOpen] = useState(false);
  const percent = calculateRankUser(point);
  const { data } = useQuery("repoData", () => couponApi.getAll());

  return (
    <div className="rank">
      <div className="card">
        <div className="rank-point">
          <p className="rank-title">{current.name}</p>
          <p className="user-point" onClick={()=>setIsOpen(!isOpen)}>{point}</p>
        </div>

        <div className="rank-point">
          <p className="point">{current.value}</p>
          <p className="point">
            {next.value} - {next.name}
          </p>
        </div>
        <Line percent={percent} strokeWidth={1} strokeColor="#BDC3C7" />

        {isOpen&& <div className="rank-description">
          <p>Với mỗi {priceToString(1000)} khách mua hàng sẽ tương đương với 1 điểm thành viên</p>
          <table>
            <tr>
              <th>Hạng</th>
              <th>Điều kiện</th>
            </tr>
            {userRanks.map((item) => (
              <tr>
                <td>{item.name}</td>
                <td>Số tiền mua hàng lớn hơn {priceToString(item.value)}</td>
              </tr>
            ))}
          </table>
        </div>}
       
      </div>
      <div className="card">
        <p className="rank-title">Mã giảm giá</p>
        <div className="rank-container">
          {data?.data &&
            data.data.map((item, index) => (
              <div className="rank-item">
                <img
                  src={
                    "https://cdn-icons-png.flaticon.com/512/1874/1874938.png"
                  }
                  className="rank-item__img"
                />
                <div className="sub">
                  <p>{item.description}</p>
                  <p>
                    Từ: <span>{new Date(item.begin).toLocaleString()}</span>
                  </p>
                  <p>
                    Đến: <span>{new Date(item.end).toLocaleString()}</span>
                  </p>
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
                    <p>
                      Mã: <span>{item.code}</span>
                    </p>
                    <Link className="use-btn" to="/checkout">
                      {" "}
                      {" Sử dụng >>"}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default UserRank;
