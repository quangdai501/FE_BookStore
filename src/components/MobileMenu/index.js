import React from 'react';
import './style.scss';
export default function MobileMenu(props) {

    return (
        <div className={`c-0 menu-modal ${props?.open ? "active-menu" : ""}`}>
            <div className="menu-close" onClick={() => props.handleOpenMenu()}>
                <i class="fas fa-times"></i>
            </div>
            {props.userInfo ? (
                <div className="lg-0 md-0 signin-mobile">
                    <div class="menu-mobile">
                        <p className="menu-mobile__item"><i class="far fa-user"></i>{props.userInfo.name}</p>
                        <p className="menu-mobile__item" onClick={() => props.gotoProfile()}>Thông tin cá nhân</p>
                        <p className="menu-mobile__item" onClick={() => props.gotoMyOrder()}>Lịch sử mua hàng</p>
                        <p className="menu-mobile__item" onClick={() => props.logoutHandler()}>Đăng xuất</p>
                        {props.userInfo.role === "admin" && <p className="menu-mobile__item" onClick={() => props.goToAdmin()}>Trang admin</p>}
                    </div>
                </div>
            ) : (
                <div className="signin-mobile" >
                    <div className="menu-mobile">
                        <p className="menu-mobile__item mobile-login" onClick={() => props.gotoLogin()}>
                            <i class="far fa-user"></i>
                            Đăng nhập
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}
