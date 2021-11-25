import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "../../../actions/authorAction";
import "./style.scss";
export default function AuthorManagement() {
  const [currenAuthor, setCurrenAuthor] = useState({});
  const changeCurrenAuthor = (e) => {
    setCurrenAuthor({ ...currenAuthor, name: e.target.value });
  };

  const [currentOption, setCurrentOption] = useState("add");
  const setCurrentAction = (option) => {
    if (currentOption !== option) setCurrentOption(option);
    if (option === "add") {
      setCurrenAuthor({});
    }
  };

  const dispatch = useDispatch();
  const authorList = useSelector((state) => state.authorList);
  const { authors } = authorList;
  const authorDelete = useSelector((state) => state.authorDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = authorDelete;
  const authorCreate = useSelector((state) => state.authorCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    author:authorcreate
  } = authorCreate;
  const authorUpdate = useSelector((state) => state.authorUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
    author:authorupdate
  } = authorUpdate;
  useEffect(() => {
    dispatch(listAuthors());
  }, [successCreate,successDelete,successUpdate]);

  const gotoEdit = (item) => {
    setCurrenAuthor(item);
    setCurrentAction("edit");
  };
  const addAuthor = () => {
    if (currenAuthor.name && currenAuthor.name !== "") {
      dispatch(createAuthor(currenAuthor));
    }
  };
  const editAuthorInfo = () => {
    if (currenAuthor._id && currenAuthor.name && currenAuthor.name !== "") {
      dispatch(updateAuthor(currenAuthor));
    }
  };
  const delAuthor = (id) => {
    if (window.confirm('Are you sure')) {
        dispatch(deleteAuthor(id));
        setCurrenAuthor({})
      }
    
  };
  return (
    <div className="container">
      <div className="manage-header">
        <p className="manage-title">Danh sách tác giả </p>
      </div>
      <div className="row">
        <div className="c-8">
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {authors?authors.map((item, index) => (
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
                        className="edit"
                        title="delete"
                        onClick={() => delAuthor(item._id)}
                      >
                        <i class="fas fa-trash-alt"></i>
                      </p>
                    </div>
                  </td>
                </tr>
              )):<></>}
            </tbody>
          </table>
        </div>
        <div className="c-4 container">
          <div className="row center-item">
            <p
              className={`manage-option ${
                currentOption === "add" ? "current-option" : ""
              }`}
              onClick={() => setCurrentAction("add")}
            >
              Tạo mới
            </p>
            <p
              className={`manage-option  ${
                currentOption === "edit" ? "current-option" : ""
              }`}
              onClick={() => setCurrentAction("edit")}
            >
              Chỉnh sửa thông tin
            </p>
          </div>
          <div className="main-frame">
            <div className="form-input">
              <label htmlFor="" className="form-label">
                Tên tác giả
              </label>
              <input
                type="text"
                onChange={changeCurrenAuthor}
                value={currenAuthor.name ? currenAuthor.name : ""}
              />
            </div>
            <div className="row center-item">
              {currentOption === "add" ? (
                <button
                  className="btn btn--border-none"
                  onClick={() => addAuthor()}
                >
                  Thêm
                </button>
              ) : (
                <button
                  className="btn btn--border-none"
                  onClick={() => editAuthorInfo()}
                >
                  Lưu thay đổi
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
