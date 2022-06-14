import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../../../actions/userAction";
import "./style.scss";
import ConfirmBox from "../../../components/ConfirmBox";
import TableLoading from "../../../components/TableLoading";

export default function UserManagement() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { users, loading } = userList;
  const [confirm, setConfirm] = useState();
  const [isActive, setIsActive] = useState(true)

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  useEffect(() => {
    dispatch(listUsers());
  }, [successDelete]);

  const delUser = (id) => {
    const user = users.find((user) => user._id === id);
    setIsActive(user.isActive);
    setConfirm(user);
  };

  const handleConfirm = (type = "yes", id) => {
    if (type === "yes") {
      dispatch(deleteUser(id));
    }
    setConfirm();
  };
  return (
    <div className="container">
      {confirm && (
        <ConfirmBox
          object={confirm.email}
          type={isActive?"Khóa":"Mở khóa"}
          category={"tài khoản"}
          handleConfirm={handleConfirm}
          confirm={confirm}
        />
      )}
      <div className="manage-header">
        <p className="manage-title">
          <i class="fas fa-users"></i>Danh sách người dùng
        </p>
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên</th>
              <th>Email</th>
              <th style={{ width: "40%" }}>Địa chỉ</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {loading && <TableLoading />}
            {users ? (
              users.map((item, index) => (
                <tr className={item.isActive?"":"lock-user"} key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.address}</td>
                  <td>
                    <div className="action" onClick={() => delUser(item._id)}>
                      {item.isActive ? (
                        <i class="fa-solid fa-lock"></i>
                      ) : (
                        <i class="fa-solid fa-unlock"></i>
                      )}
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
  );
}
