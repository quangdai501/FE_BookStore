import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listPublishers,
  createPublisher,
  updatePublisher,
  deletePublisher,
} from "../../../actions/publisherAction";
import ConfirmBox from "../../../components/ConfirmBox";
import Toast from "../../../components/Toast";
import "./style.scss";
import Loading from '../../../components/Loading'

export default function PublisherManagement() {
  const [currenPublisher, setCurrenPublisher] = useState({ name: "" });
  const [error, setError] = useState(false);
  const [confirm, setConfirm] = useState();
  const changeCurrenPublisher = (e) => {
    setCurrenPublisher({ ...currenPublisher, name: e.target.value });
  };

  const [currentOption, setCurrentOption] = useState("add");
  const setCurrentAction = (option) => {
    setError(false)
    if (currentOption !== option) setCurrentOption(option);
    if (option === "add") {
      setCurrenPublisher({ name: "" });
    }
  };

  const dispatch = useDispatch();
  const publisherList = useSelector((state) => state.publisherList);
  const { publishers, loading } = publisherList;
  const publisherDelete = useSelector((state) => state.publisherDelete);
  const { loading: loadingDelete, success: successDelete } = publisherDelete;
  const publisherCreate = useSelector((state) => state.publisherCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    // Publisher:Publishercreate
  } = publisherCreate;
  const publisherUpdate = useSelector((state) => state.publisherUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    // Publisher:Publisherupdate
  } = publisherUpdate;
  useEffect(() => {
    dispatch(listPublishers());
  }, []);
  useEffect(() => {
    if (successCreate || successDelete || successUpdate) {
      dispatch(listPublishers());
    }
  }, [successCreate, successDelete, successUpdate]);

  const gotoEdit = (item) => {
    setCurrenPublisher(item);
    setCurrentAction("edit");
  };
  const addPublisher = () => {
    if (currenPublisher.name !== "") {
      setError(false)
      dispatch(createPublisher(currenPublisher));
    }
    else {
      setError(true)
    }
  };
  const editPublisherInfo = () => {
    if (currenPublisher._id && currenPublisher.name !== "") {
      setError(false)
      dispatch(updatePublisher(currenPublisher));
    }
    else {
      setError(true)
    }
  };
  const delPublisher = (id) => {
    const publisher = publishers.find(publisher => publisher._id === id)
    setConfirm(publisher);
  };
  const handleConfirm = (type = "yes", id) => {
    if (type === "yes") {
      dispatch(deletePublisher(id));
      setCurrenPublisher({ name: "" });
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
          category={"nhà xuất bản"}
          handleConfirm={handleConfirm}
          confirm={confirm}
        />}
      <div className="manage-header">
        <p className="manage-title"><i class="fas fa-list"></i>Danh sách nhà xuất bản </p>
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
                {publishers ? (
                  publishers.map((item, index) => (
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
                            onClick={() => delPublisher(item._id)}
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
            </table>}
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
            {currenPublisher._id && (
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
                Tên nhà xuất bản
              </label>
              <input
                type="text"
                onChange={changeCurrenPublisher}
                value={currenPublisher.name}
              />
              {error && <p className="error-label">Tên nhà xuất bản không được để trống</p>}
            </div>
            <div className="row center-item">
              {currentOption === "add" ? (
                <button
                  className="btn btn--border-none btn--color-second"
                  onClick={() => addPublisher()}
                >
                  {loadingCreate ? "...Thêm" : "Thêm"}
                </button>
              ) : (
                <button
                  className="btn btn--border-none btn--color-second"
                  onClick={() => editPublisherInfo()}
                >
                  {loadingUpdate ? "...Lưu thay đổi" : "Lưu thay đổi"}
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
