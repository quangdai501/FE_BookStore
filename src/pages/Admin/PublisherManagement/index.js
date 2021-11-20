import React, { useState } from 'react';
import './style.scss';
export default function PublisherManagement() {
    const [currentOption, setCurrentOption] = useState("add");
    const setCurrentAction = (option) => {
        if (currentOption !== option)
            setCurrentOption(option);
    }
    const addAuthor = () => {
        console.log()
    }
    const editAuthorInfo = () => {
        console.log()
    }
    const data = [
        {
            authorID: "abcnd",
            name: "Kim Đồng",
        }, {
            authorID: "abcnd",
            name: "Kim Đồng",
        }, {
            authorID: "abcnd",
            name: "Kim Đồng",
        }, {
            authorID: "abcnd",
            name: "Kim Đồng",
        }]
    return (
        <div className="container">
            <div className="manage-header">
                <p className="manage-title">Danh sách nhà xuất bản</p>
            </div>
            <div className="row">
                <div className="c-8">
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    STT
                                </th>
                                <th>
                                    Tên
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
                                        <div className="action">
                                            <p className="edit" title="Chỉnh sửa">
                                                <i className="fas fa-edit"></i>
                                            </p>
                                        </div>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
                <div className="c-4 container">
                    <div className="row center-item" >
                        <p className={`manage-option ${currentOption === "add" ? "current-option" : ""}`} onClick={() => setCurrentAction("add")}>Tạo mới</p>
                        <p className={`manage-option  ${currentOption === "edit" ? "current-option" : ""}`} onClick={() => setCurrentAction("edit")}>Chỉnh sửa thông tin</p>
                    </div>
                    <div className="main-frame">
                        <div className="form-input">
                            <label htmlFor="" className="form-label">Tên tác giả</label>
                            <input type="text" />
                        </div>
                        <div className="row center-item">
                            {currentOption === 'add' ? <button className="btn btn--submit" onClick={() => addAuthor}>Thêm</button> : <button className="btn btn--submit" onClick={() => editAuthorInfo}>Lưu thay đổi</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
