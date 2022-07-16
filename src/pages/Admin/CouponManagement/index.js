import React from 'react';
import { useQuery } from "react-query";
import "./style.scss";
import TableLoading from "../../../components/TableLoading";
import couponApi from "../../../api/couponApi";
import { Link } from "react-router-dom";

export default function CouponManagement() {
  const { isLoading, error, data } = useQuery("couponData", () =>
    couponApi.getAll()
  );



  return (
    <div className="container">
      <div className="manage-header">
        <p className="manage-title">
          <i class="fas fa-list"></i>Danh sách mã giảm giá{" "}
        </p>
        <Link to="/admin/coupons/create">
              <div className="product-action" title="Thêm sản phẩm">
                <i className="fas fa-plus"></i>
              </div>
            </Link>
      </div>
      <div className="row">
        <div className="c-12 table-scroll lg-12 md-12">
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã giảm giá</th>
                <th>Mô tả</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && <TableLoading />}
              {data?.data ? (
                data.data.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.code}</td>
                    <td>{item.description}</td>
                    <td>
                      <div className="action">
                      <Link to={`/admin/coupons/edit/${item._id}`}>
                            <p className="edit" title="Chỉnh sửa">
                              <i className="fas fa-edit"></i>
                            </p>
                          </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
