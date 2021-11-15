import React from 'react';
import "./style.scss";
import { Link } from 'react-router-dom';
export default function ProductManagement() {
    const data = [{
        image: '../images/img1.jpg',
        name: "Sách hay",
        price: 30000,
    }, {
        image: '../images/img1.jpg',
        name: "Sách hay",
        price: 30000,
    }, {
        image: '../images/img1.jpg',
        name: "Sách hay",
        price: 30000,
    }, {
        image: '../images/img1.jpg',
        name: "Sách hay",
        price: 30000,
    }, {
        image: '../images/img1.jpg',
        name: "Sách hay",
        price: 30000,
    }]
    return (<>
        <div className="container">
            <div className="product-manage">
                <Link to="/admin/product-management/create">
                    <div className="product-action" title="Thêm sản phẩm">
                        <i className="fas fa-plus"></i>
                    </div>
                </Link>
                <table>
                    <thead>

                        <tr>
                            <th>
                                STT
                            </th>
                            <th>
                                Hình ảnh
                            </th>
                            <th style={{ 'width': '40%' }} >
                                Tên sản phẩm
                            </th>
                            <th>
                                Giá bán
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
                                    <img src={item.image} alt="Book" />
                                </td>
                                <td>
                                    {item.name}
                                </td>
                                <td>
                                    {item.price}
                                </td>
                                <td>
                                    <div className="action">
                                        <p className="delete" title="Xóa">
                                            <i className="fas fa-trash"></i>
                                        </p>
                                        <Link to={`/admin/product-management/edit/${'productID'}`}>
                                            <p className="edit" title="Chỉnh sửa">
                                                <i className="fas fa-edit"></i>
                                            </p>
                                        </Link>
                                    </div>
                                </td>
                            </tr>)
                        }
                    </tbody>

                </table>
            </div>
        </div >
    </>
    )
}
