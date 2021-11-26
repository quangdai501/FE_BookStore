import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../../../actions/userAction";
import "./style.scss";
export default function UserManagement() {
  // const data = [{
  //     name: "Trần Quang Đại",
  //     email: "tranquangdait02@gmail.com",
  //     address: "Số 05, thôn 2, xã Hòa Bắc, Di Linh, Lâm Đồng"
  // }, {
  //     name: "Trần Quang Đại",
  //     email: "tranquangdait02@gmail.com",
  //     address: "Số 05, thôn 2, xã Hòa Bắc, Di Linh, Lâm Đồng"
  // }, {
  //     name: "Trần Quang Đại",
  //     email: "tranquangdait02@gmail.com",
  //     address: "Số 05, thôn 2, xã Hòa Bắc, Di Linh, Lâm Đồng"
  // }, {
  //     name: "Trần Quang Đại",
  //     email: "tranquangdait02@gmail.com",
  //     address: "Số 05, thôn 2, xã Hòa Bắc, Di Linh, Lâm Đồng"
  // }]
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  useEffect(() => {
    dispatch(listUsers());
  }, [successDelete]);

  const delUser=(id)=>{
    if (window.confirm('Are you sure')) {
        dispatch(deleteUser(id));
        // setCurrenAuthor({})
      }
  }
  return (
    <div className="container">
      <div className="manage-header">
        <p className="manage-title">Danh sách người dùng</p>
      </div>
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
          {users?users.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.address}</td>
              <td>
                <div className="action" onClick={()=>delUser(item._id)}>
                  <i className="fas fa-trash"></i>
                </div>
              </td>
            </tr>
          )):<></>}
        </tbody>
      </table>
    </div>
  );
}
