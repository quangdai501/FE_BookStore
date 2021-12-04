import React from 'react';
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

    return (
        <header className="header">
            <div className="row">
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
