import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listCategorys,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../../actions/categoryAction";
import ConfirmBox from "../../../components/ConfirmBox";
import Toast from "../../../components/Toast";
import "./style.scss";
import TableLoading from '../../../components/TableLoading';
import { CREATE, DELETE, FETCH_DATA, UPDATE } from "../../../constants/common";
import { CATEGORY_RESET } from "../../../constants/category";
const TIME_OUT = 5000;
export default function CategoryManagement() {
  const [currenCategory, setCurrenCategory] = useState({ name: "" });
  const [error, setError] = useState(false);
  const [confirm, setConfirm] = useState();
  const changeCurrenCategory = (e) => {
    setCurrenCategory({ ...currenCategory, name: e.target.value });
  };
  const timeoutRef = useRef();

  const [currentOption, setCurrentOption] = useState("add");
  const setCurrentAction = (option) => {
    setError(false)
    if (currentOption !== option) setCurrentOption(option);
    if (option === "add") {
      setCurrenCategory({ name: "" });
    }
  };

  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const { categorys, loading, type, success, error: categoryError } = categoryList;

  useEffect(() => {
    dispatch(listCategorys());
  }, []);

  useEffect(() => {
    return ()=>{
      dispatch({ type: CATEGORY_RESET });
    }
  }, []);
  
  const gotoEdit = (item) => {
    setCurrenCategory(item);
    setCurrentAction("edit");
  };

  const addCategory = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      dispatch({ type: CATEGORY_RESET })
    } 
    if (currenCategory.name !== "") {
      setError(false)
      dispatch(createCategory(currenCategory));
      timeoutRef.current = setTimeout(() => dispatch({ type: CATEGORY_RESET }), TIME_OUT)
    }
    else {
      setError(true)
    }
  };
  const editCategoryInfo = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      dispatch({ type: CATEGORY_RESET })
    } 
    if (currenCategory._id && currenCategory.name !== "") {
      setError(false)
      dispatch(updateCategory(currenCategory));
      timeoutRef.current = setTimeout(() => dispatch({ type: CATEGORY_RESET }), TIME_OUT)
    }
    else {
      setError(true)
    }
  };
  const delCategory = (id) => {
    const category = categorys.find(category => category._id === id)
    setConfirm(category);
  };
  const handleConfirm = (type = "yes", id) => {
    if (type === "yes") {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        dispatch({ type: CATEGORY_RESET })
      } 
      dispatch(deleteCategory(id));
      timeoutRef.current = setTimeout(() => dispatch({ type: CATEGORY_RESET }), TIME_OUT)
      setCurrenCategory({ name: "" });
      setCurrentAction("add");
    }
    setConfirm();
  }
  return (
    <div className="container">
      {confirm &&
        <ConfirmBox
          object={confirm.name}
          type={"xóa"}
          category={"danh mục"}
          handleConfirm={handleConfirm}
          confirm={confirm}
        />}
      <div className="manage-header">
        <p className="manage-title"><i class="fas fa-clipboard-list"></i>Danh sách danh mục </p>
      </div>
      <div className="row">
        <div className="c-8 table-scroll lg-12 md-12">
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {loading && type === FETCH_DATA && <TableLoading />}
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
                          className="edit ml-15"
                          title="Xóa"
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
        <div className="c-4 container lg-12 md-12">
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
              <input
                type="text"
                onChange={changeCurrenCategory}
                value={currenCategory.name}
              />
              {error && <p className="error-label">Tên danh mục không được để trống</p>}
            </div>
            <div className="row center-item">
              {currentOption === "add" ? (
                <button
                  className="btn btn--border-none btn--color-second"
                  onClick={() => addCategory()}
                >
                  {loading && type === CREATE ? '...Thêm' : "Thêm"}
                </button>
              ) : (
                <button
                  className="btn btn--border-none btn--color-second"
                  onClick={() => editCategoryInfo()}
                >
                  {loading && type === UPDATE
                    ? "... Lưu thay đổi"
                    : "Lưu thay đổi"}
                </button>
              )}
            </div>
          </div>
          {categoryError && <Toast message={categoryError} type={"error"}/>}
          { success && type === CREATE && <Toast message={"Thêm thành công"} type={"success"} />}
          { success && type === UPDATE && <Toast message={"Sửa thành công"} type={"success"} />}
          { success && type === DELETE && <Toast message={"Xóa thành công"} type={"success"} />}
        </div>
      </div>
    </div>
  );
}
