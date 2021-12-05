import React, { useEffect } from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../../../actions/userAction';
export default function DashBoardHeader() {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(logout());
    };
    const gotoShop = () => {
        window.location.href = window.location.origin;
    }
    // const breadcrums = {
    //     admin: {
    //         name: "Trang chủ",
    //         url: "/admin",
    //         children: [
    //             {
    //                 product: {
    //                     name: "Sản phẩm",
    //                     url: "/product",
    //                     children: [{
    //                         create: {
    //                             name: "Tạo mới",
    //                             url: "/create",
    //                             children: []
    //                         },
    //                     }, {
    //                         edit: {
    //                             name: "Chỉnh sửa",
    //                             url: "/edit",
    //                             children: []
    //                         }
    //                     }]
    //                 }
    //             }, {
    //                 author: {
    //                     name: "Tác giả",
    //                     url: "/author", children: []
    //                 },
    //             }, {
    //                 category: {
    //                     name: "Danh mục",
    //                     url: "/category", children: []
    //                 },
    //             }, {
    //                 publisher: {
    //                     name: "Nhà xuất bản",
    //                     url: "/publisher",
    //                     children: []
    //                 }

    //             }
    //         ]
    //     }
    // }
    return (
        <header className="header">
            <div className="row">
                <div className="left-side">

                </div>
                <div className="col c-12">
                    <div className="right-side">
                        <i className="far fa-user"></i>
                        <div className="signin">
                            <div class="dropdown">
                                <span className="admin-name">{userInfo.name} <i class="fas fa-caret-down"></i></span>
                                <div class="dropdown-content">
                                    <span onClick={gotoShop}>Về shop</span>
                                    <span onClick={logoutHandler}><p className="logout">Đăng xuất <i className="fas fa-sign-out-alt"></i></p></span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </header>
    )
}
