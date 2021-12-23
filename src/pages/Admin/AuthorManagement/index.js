import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "../../../actions/authorAction";
import ConfirmBox from "../../../components/ConfirmBox";
import Toast from "../../../components/Toast";
import "./style.scss";
import Loading from '../../../components/Loading';

export default function AuthorManagement() {
  const [currenAuthor, setCurrenAuthor] = useState({ name: "" });
  const [error, setError] = useState(false);
  const [confirm, setConfirm] = useState();
  const changeCurrenAuthor = (e) => {
    setCurrenAuthor({ ...currenAuthor, name: e.target.value });
  };

  const [currentOption, setCurrentOption] = useState("add");
  const setCurrentAction = (option) => {
    setError(false)
    if (currentOption !== option) setCurrentOption(option);
    if (option === "add") {
      setCurrenAuthor({ name: "" });
    }
  };

  const dispatch = useDispatch();
  const authorList = useSelector((state) => state.authorList);
  const { authors, loading } = authorList;
  const authorDelete = useSelector((state) => state.authorDelete);
  const { loading: loadingDelete, success: successDelete } = authorDelete;
  const authorCreate = useSelector((state) => state.authorCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    // author: authorcreate
  } = authorCreate;
  const authorUpdate = useSelector((state) => state.authorUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    // author: authorupdate
  } = authorUpdate;
  useEffect(() => {
    dispatch(listAuthors());
  }, []);
  useEffect(() => {
    if (successCreate || successDelete || successUpdate) {
      dispatch(listAuthors());
    }
  }, [successCreate, successDelete, successUpdate]);

  const gotoEdit = (item) => {
    setCurrenAuthor(item);
    setCurrentAction("edit");
  };
  const addAuthor = () => {
    if (currenAuthor.name !== "") {
      setError(false)
      dispatch(createAuthor(currenAuthor));
    }
    else {
      setError(true)
    }
  };
  const editAuthorInfo = () => {
    if (currenAuthor._id && currenAuthor.name !== "") {
      setError(false)
      dispatch(updateAuthor(currenAuthor));
    } else {
      setError(true)
    }
  };
  const delAuthor = (id) => {
    const author = authors.find(author => author._id === id)
    setConfirm(author);
  };
  const handleConfirm = (type = "yes", id) => {
    if (type === "yes") {
      dispatch(deleteAuthor(id));
      setCurrenAuthor({ name: "" });
      setCurrentAction("add")
    }
    setConfirm();
  }
  return (
    <div className="container">
      {confirm &&
        <ConfirmBox
          object={confirm.name}
          type={"xóa"}
          category={"tác giả"}
          handleConfirm={handleConfirm}
          confirm={confirm}
        />}
      <div className="manage-header">
        <p className="manage-title"><i class="fas fa-user-tie"></i>Danh sách tác giả </p>
      </div>
      <div className="row">
        <div className="c-8 table-scroll lg-12 md-12">
          {loading ? <Loading /> :
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {authors ? (
                  authors.map((item, index) => (
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
                            title="delete"
                            onClick={() => delAuthor(item._id)}
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
          }</div>
        <div className="c-4 container lg-12 md-12">
          <div className="row center-item">
            <p
              className={`manage-option ${currentOption === "add" ? "current-option" : ""
                }`}
              onClick={() => setCurrentAction("add")}
            >
              Tạo mới
            </p>
            {currenAuthor._id && (
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
                Tên tác giả
              </label>
              <input
                type="text"
                onChange={changeCurrenAuthor}
                value={currenAuthor.name}
              />
              {error && <p className="error-label">Tên tác giả không được để trống</p>}
            </div>
            <div className="row center-item">
              {currentOption === "add" ? (
                <button
                  className="btn btn--border-none btn--color-second"
                  onClick={() => addAuthor()}
                >
                  {loadingCreate ? '...Thêm' : "Thêm"}
                </button>
              ) : (
                <button
                  className="btn btn--border-none btn--color-second"
                  onClick={() => editAuthorInfo()}
                >
                  {loadingUpdate
                    ? "... Lưu thay đổi"
                    : "Lưu thay đổi"}
                </button>
              )}
            </div>
          </div>
          {successCreate && <Toast message={"Thêm thành công"} type={"success"} />}
          {successUpdate && <Toast message={"Sửa thành công"} type={"success"} />}
          {successDelete && <Toast message={"Xóa thành công"} type={"success"} />}
        </div>
      </div>
    </div>
  );
}
