import React, { useEffect, useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { deleteProduct, listProducts } from "../../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../components/Pagination";
import ConfirmBox from "../../../components/ConfirmBox";
import Toast from "../../../components/Toast";
import TableLoading from "../../../components/TableLoading";
export default function ProductManagement() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const [check, setCheck] = useState();
  const { loading, error, products, page, pages, total } = productList;
  const [confirm, setConfirm] = useState();
  const [search, setSearch] = useState("");
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const [query, setQuery] = useState({ size: 5, page: 1, search: null });
  useEffect(() => {
    dispatch(listProducts(query));
  }, [query.page, query.search, successDelete]);
  const direct = (name, value) => {
    const newObj = { ...query };
    newObj[name] = value;
    setQuery(newObj);
  };
  const delProduct = (id) => {
    const product = products.find((product) => product._id === id);
    setConfirm(product);
  };
  const handleConfirm = (type = "yes", id) => {
    if (type === "yes") {
      dispatch(deleteProduct(id));
    }
    setCheck(true);
    setConfirm();
  };
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };
  const onSearch = () => {
    const newQuery = { ...query };
    newQuery["page"] = 1;
    newQuery["search"] = search;

    setQuery(newQuery);
    console.log(newQuery);
  };

  const onClear = () => {
    const newQuery = { ...query };
    newQuery["page"] = 1;
    newQuery["search"] = null;
    setSearch("");
    setQuery(newQuery);
  };
  return (
    <>
      <div className="container">
        {successDelete && check && <Toast message={"Đã xóa"} type="success" />}
        {confirm && (
          <ConfirmBox
            object={confirm.name}
            type={"xóa"}
            category={"sản phẩm"}
            handleConfirm={handleConfirm}
            confirm={confirm}
          />
        )}
        <div className="product-manage">
          <div className="manage-header">
            <div className="search-container">
              <input
                type="text"
                placeholder="Tìm kiếm ..."
                onChange={onChangeSearch}
                value={search}
              />
              {search && (
                <i class="fa-solid fa-xmark close-btn" onClick={onClear}></i>
              )}

              <button type="submit" onClick={onSearch}>
                <i class="fa fa-search"></i>
              </button>
            </div>
            <p className="manage-title">
              <i class="fas fa-book"></i>Danh sách sản phẩm
            </p>
            <Link to="/admin/product/create">
              <div className="product-action" title="Thêm sản phẩm">
                <i className="fas fa-plus"></i>
              </div>
            </Link>
          </div>
          <div className="table-scroll">
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
                {loading && <TableLoading />}
                {products ? (
                  products.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <img src={item.image} alt="Book" />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>
                        <div className="action">
                          {item.isDelete && (
                            <p
                              className="delete"
                              title="Xóa"
                              onClick={() => delProduct(item._id)}
                            >
                              <i className="fas fa-trash"></i>
                            </p>
                          )}

                          <Link to={`/admin/product/edit/${item._id}`}>
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

          <Pagination page={page} pages={pages} direct={direct} />
        </div>
      </div>
    </>
  );
}
