import React, { useState, useEffect, useRef } from 'react';
import './style.scss';
import useClickOutside from "../../hooks/useClickOutside";

const MobileMenu = (props) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    const handleClick = () => {
        if (props.open) {
            setOpen(false);
            props.handleCloseMenu()
        }
    }
    useClickOutside(menuRef, () => handleClick());

    useEffect(() => {
        if (!props.open) {
            setOpen(false);
        }
    }, [props.open])
    useEffect(() => {
        if (props.open) {
            setOpen(true);
        }
    }, [props.open])
    return <>
        <div className={`c-0 menu-modal ${open ? "active-menu" : ""}`}>
            <div className="menu-close" onClick={() => handleClick()}>
                <i class="fas fa-times"></i>
            </div>
            {props.userInfo ? (
                <div className="lg-0 md-0 signin-mobile" ref={menuRef}>
                    <div class="menu-mobile">
                        <p className="menu-mobile__item"><i class="far fa-user"></i>{props.userInfo.name}</p>
                        <p className="menu-mobile__item" onClick={() => props.gotoProfile()}>Thông tin cá nhân</p>
                        <p className="menu-mobile__item" onClick={() => props.gotoMyOrder()}>Lịch sử mua hàng</p>
                        <p className="menu-mobile__item" onClick={() => props.logoutHandler()}>Đăng xuất</p>
                        {props.userInfo.role === "admin" && <p className="menu-mobile__item" onClick={() => props.goToAdmin()}>Trang admin</p>}
                    </div>
                </div>
            ) : (
                <div className="signin-mobile" ref={menuRef}>
                    <div className="menu-mobile">
                        <p className="menu-mobile__item mobile-login" onClick={() => props.gotoLogin()}>
                            <i class="far fa-user"></i>
                            Đăng nhập
                        </p>
                    </div>
                </div>
            )}
        </div>
    </>

}
export default MobileMenu;