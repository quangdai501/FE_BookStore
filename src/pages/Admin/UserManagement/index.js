import React from 'react';
import './style.scss';
export default function UserManagement() {
    const data = [{
        name: "Trần Quang Đại",
        email: "tranquangdait02@gmail.com",
        address: "Số 05, thôn 2, xã Hòa Bắc, Di Linh, Lâm Đồng"
    }, {
        name: "Trần Quang Đại",
        email: "tranquangdait02@gmail.com",
        address: "Số 05, thôn 2, xã Hòa Bắc, Di Linh, Lâm Đồng"
    }, {
        name: "Trần Quang Đại",
        email: "tranquangdait02@gmail.com",
        address: "Số 05, thôn 2, xã Hòa Bắc, Di Linh, Lâm Đồng"
    }, {
        name: "Trần Quang Đại",
        email: "tranquangdait02@gmail.com",
        address: "Số 05, thôn 2, xã Hòa Bắc, Di Linh, Lâm Đồng"
    }]
    return (
        <div className="container">
            <div className="manage-header">
                <p className="manage-title">Danh sách người dùng</p>
            </div>
            <table>
                <thead>

                    <tr>
                        <th>
                            STT
                        </th>
                        <th>
                            Tên
                        </th>
                        <th  >
                            Email
                        </th>
                        <th style={{ 'width': '40%' }}>
                            Địa chỉ
                        </th>
                        <th>
                            Thao tác
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {
                        data.map((item, index) => <tr key={index}>
                            <td>
                                {index + 1}
                            </td>
                            <td>
                                {item.name}
                            </td>
                            <td>
                                {item.email}
                            </td>
                            <td>
                                {item.address}
                            </td>
                            <td>
                                <div className="action">
                                    <i className="fas fa-trash"></i>
                                </div>
                            </td>
                        </tr>)
                    }
                </tbody>

            </table>
        </div>
    )
}
