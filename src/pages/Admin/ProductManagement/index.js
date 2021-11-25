import React, { useEffect, useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { listProducts } from "../../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../components/Pagination";
export default function ProductManagement() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages, total } = productList;

  const [query, setQuery] = useState({size:5});

  useEffect(() => {
    dispatch(listProducts(query));
  }, [JSON.stringify(query)]);
  const direct = (name, value) => {
    const newobj = { ...query };
    newobj[name] = value;
    setQuery(newobj);
  };
  return (
    <>
      <div className="container">
        <div className="product-manage">
          <div className="manage-header">
            <p className="manage-title">Danh sách sản phẩm</p>
            <Link to="/admin/product/create">
              <div className="product-action" title="Thêm sản phẩm">
                <i className="fas fa-plus"></i>
              </div>
            </Link>
          </div>
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Hình ảnh</th>
                <th style={{ width: "40%" }}>Tên sản phẩm</th>
                <th>Giá bán</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products?products.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={item.image} alt="Book" />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>
                    <div className="action">
                      <p className="delete" title="Xóa">
                        <i className="fas fa-trash"></i>
                      </p>
                      <Link to={`/admin/product/edit/${item._id}`}>
                        <p className="edit" title="Chỉnh sửa">
                          <i className="fas fa-edit"></i>
                        </p>
                      </Link>
                    </div>
                  </td>
                </tr>
              )):<></>}
            </tbody>
          </table>
          <Pagination page={page} pages={pages} direct={direct} />
        </div>
      </div>
    </>
  );
}
