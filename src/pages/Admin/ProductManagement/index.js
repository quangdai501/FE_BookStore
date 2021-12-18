import React, { useEffect, useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { deleteProduct, listProducts } from "../../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../components/Pagination";
import ConfirmBox from "../../../components/ConfirmBox";
import Toast from '../../../components/Toast';
import Loading from '../../../components/Loading'
export default function ProductManagement() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const [check, setCheck] = useState();
  const { loading, error, products, page, pages, total } = productList;
  const [confirm, setConfirm] = useState();
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const [query, setQuery] = useState({ size: 5, page: 1 });
  useEffect(() => {
    dispatch(listProducts(query));
  }, [query.page, successDelete]);
  const direct = (name, value) => {
    const newobj = { ...query };
    newobj[name] = value;
    setQuery(newobj);
  };
  const delProduct = (id) => {
    const product = products.find(product => product._id === id)
    setConfirm(product);
  }
  const handleConfirm = (type = "yes", id) => {
    if (type === "yes") {
      dispatch(deleteProduct(id))
    }
    setCheck(true);
    setConfirm();
  }
  return (
    <>
      <div className="container">

        {successDelete && check && <Toast message={"Đã xóa"} type="success" />}
        {confirm &&
          <ConfirmBox
            object={confirm.name}
            type={"xóa"}
            category={"sản phẩm"}
            handleConfirm={handleConfirm}
            confirm={confirm}
          />}
        <div className="product-manage">
          <div className="manage-header">
            <p className="manage-title"><i class="fas fa-book"></i>Danh sách sản phẩm</p>
            <Link to="/admin/product/create">
              <div className="product-action" title="Thêm sản phẩm">
                <i className="fas fa-plus"></i>
              </div>
            </Link>
          </div>
          {loading ? <Loading /> : <>
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
                {products ? products.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img src={item.image} alt="Book" />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>
                      <div className="action">
                        <p className="delete" title="Xóa" onClick={() => delProduct(item._id)}>
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
                )) : <></>}
              </tbody>
            </table>
            <Pagination page={page} pages={pages} direct={direct} /></>}
        </div>
      </div>
    </>
  );
}
