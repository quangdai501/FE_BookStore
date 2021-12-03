import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listCategorys,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../../actions/categoryAction";
import "./style.scss";
export default function CategoryManagement() {
  const [currenCategory, setCurrenCategory] = useState({ name: "" });
  const [error, setError] = useState(false);
  const changeCurrenCategory = (e) => {
    setCurrenCategory({ ...currenCategory, name: e.target.value });
    if (e.target.value === "") {
      setError(true);
    } else {
      setError(false);
    }
  };

  const [currentOption, setCurrentOption] = useState("add");
  const setCurrentAction = (option) => {
    if (currentOption !== option) setCurrentOption(option);
    if (option === "add") {
      setCurrenCategory({ name: "" });
    }
  };

  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const { categorys } = categoryList;
  const categoryDelete = useSelector((state) => state.categoryDelete);
  const { loading: loadingDelete, success: successDelete } = categoryDelete;
  const categoryCreate = useSelector((state) => state.categoryCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    // category:categorycreate
  } = categoryCreate;
  const categoryUpdate = useSelector((state) => state.categoryUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    // category:categoryupdate
  } = categoryUpdate;
  useEffect(() => {
    dispatch(listCategorys());
  }, []);
  useEffect(() => {
    if (successCreate || successDelete || successUpdate) {
      dispatch(listCategorys());
    }
  }, [successCreate, successDelete, successUpdate]);
  const gotoEdit = (item) => {
    setCurrenCategory(item);
    setCurrentAction("edit");
  };
  const addCategory = () => {
    if (currenCategory.name !== "") {
      dispatch(createCategory(currenCategory));
    }
  };
  const editCategoryInfo = () => {
    if (currenCategory._id && currenCategory.name !== "") {
      dispatch(updateCategory(currenCategory));
    }
  };
  const delCategory = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteCategory(id));
      setCurrenCategory({ name: "" });
      setCurrentAction("add");
    }
  };
  return (
    <div className="container">
      <div className="manage-header">
        <p className="manage-title">Danh sách danh mục </p>
      </div>
      <div className="row">
        <div className="c-8 table-scroll">
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {categorys ? (
                categorys.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>
                      <div className="action">
                        <p
                          className="edit"
                          title="Chỉnh sửa"
                          onClick={() => gotoEdit(item)}
                        >
                          <i className="fas fa-edit"></i>
                        </p>
                        <p
                          className="edit ml-5"
                          title="delete"
                          onClick={() => delCategory(item._id)}
                        >
                          <i class="fas fa-trash-alt"></i>
                        </p>
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
        <div className="c-4 container">
          <div className="row center-item">
            <p
              className={`manage-option ${currentOption === "add" ? "current-option" : ""
                }`}
              onClick={() => setCurrentAction("add")}
            >
              Tạo mới
            </p>
            {currenCategory._id && (
              <p
                className={`manage-option  ${currentOption === "edit" ? "current-option" : ""
                  }`}
                onClick={() => setCurrentAction("edit")}
              >
                Chỉnh sửa thông tin
              </p>
            )}
          </div>
          <div className="main-frame">
            <div className="form-input">
              <label htmlFor="" className="form-label">
                Tên danh mục
              </label>
              {error && <p>Tên danh mục không được để trống</p>}
              <input
                type="text"
                onChange={changeCurrenCategory}
                value={currenCategory.name}
              />
            </div>
            <div className="row center-item">
              {currentOption === "add" ? (
                <button
                  className="btn btn--border-none"
                  onClick={() => addCategory()}
                >
                  {loadingCreate ? '...Thêm' : "Thêm"}
                </button>
              ) : (
                <button
                  className="btn btn--border-none"
                  onClick={() => editCategoryInfo()}
                >
                  {loadingUpdate
                    ? "... Lưu thay đổi"
                    : "Lưu thay đổi"}
                </button>
              )}
            </div>
          </div>
          {successCreate && <p>Thêm thành công</p>}
          {successUpdate && <p>Sửa thành công</p>}
          {successDelete && <p>Xóa thành công</p>}
        </div>
      </div>
    </div>
  );
}
