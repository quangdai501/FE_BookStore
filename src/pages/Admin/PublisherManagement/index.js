import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listPublishers,
  createPublisher,
  updatePublisher,
  deletePublisher,
} from "../../../actions/publisherAction";
import "./style.scss";
export default function PublisherManagement() {
  const [currenPublisher, setCurrenPublisher] = useState({});
  const changeCurrenPublisher = (e) => {
    setCurrenPublisher({ ...currenPublisher, name: e.target.value });
  };

  const [currentOption, setCurrentOption] = useState("add");
  const setCurrentAction = (option) => {
    if (currentOption !== option) setCurrentOption(option);
    if (option === "add") {
      setCurrenPublisher({});
    }
  };

  const dispatch = useDispatch();
  const publisherList = useSelector((state) => state.publisherList);
  const { publishers } = publisherList;
  const publisherDelete = useSelector((state) => state.publisherDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = publisherDelete;
  const publisherCreate = useSelector((state) => state.publisherCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    // Publisher:Publishercreate
  } = publisherCreate;
  const publisherUpdate = useSelector((state) => state.publisherUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
    // Publisher:Publisherupdate
  } = publisherUpdate;
  useEffect(() => {
    dispatch(listPublishers());
  }, [successCreate,successDelete,successUpdate]);

  const gotoEdit = (item) => {
    setCurrenPublisher(item);
    setCurrentAction("edit");
  };
  const addPublisher = () => {
    if (currenPublisher.name && currenPublisher.name !== "") {
      dispatch(createPublisher(currenPublisher));
    }
  };
  const editPublisherInfo = () => {
    if (currenPublisher._id && currenPublisher.name && currenPublisher.name !== "") {
      dispatch(updatePublisher(currenPublisher));
    }
  };
  const delPublisher = (id) => {
    if (window.confirm('Are you sure')) {
        dispatch(deletePublisher(id));
        setCurrenPublisher({})
      }
    
  };
  return (
    <div className="container">
      <div className="manage-header">
        <p className="manage-title">Danh sách nhà xuất bản </p>
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
              {publishers?publishers.map((item, index) => (
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
                        onClick={() => delPublisher(item._id)}
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
                Tên nhà xuất bản
              </label>
              <input
                type="text"
                onChange={changeCurrenPublisher}
                value={currenPublisher.name ? currenPublisher.name : ""}
              />
            </div>
            <div className="row center-item">
              {currentOption === "add" ? (
                <button
                  className="btn btn--border-none"
                  onClick={() => addPublisher()}
                >
                  Thêm
                </button>
              ) : (
                <button
                  className="btn btn--border-none"
                  onClick={() => editPublisherInfo()}
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
