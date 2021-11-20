import React from 'react'
import './style.scss';
import { Link, useLocation } from 'react-router-dom'
export default function SideBar() {
    return (
        <nav className="nav-bar">

            <MenuLink
                to="/admin/product"
                label="Quản lý sản phẩm"
                icon={<i className="fas fa-book"></i>}
            />
            <MenuLink
                to="/admin/user"
                label="Quản lý người dùng"
                icon={<i className="fas fa-users"></i>}

            />
            <MenuLink
                to="/admin/order"
                label="Quản lý đơn hàng"
                icon={<i className="fas fa-users"></i>}

            />
            <MenuLink
                to="/admin/author"
                label="Quản lý tác giả"
                icon={<i className="fas fa-user-tie"></i>}

            />
            <MenuLink
                to="/admin/publisher"
                label="Quản lý nhà xuất bản"
                icon={<i className="fas fa-list"></i>}
            />
            <MenuLink
                to="/admin/statistics"
                label="Thống kê"
                icon={<i class="fas fa-chart-bar"></i>}
            />
        </nav>
    )
}


const MenuLink = ({
    label,
    to,
    icon
}) => {
    let location = useLocation();
    var active = location?.pathname.includes(to) ? 'active-link' : '';
    const Icon = () => <>{icon}</>
    return (
        <p className={`nav-bar__item ${active}`}>
            <Icon />
            <Link to={to} className="link side-bar__item">{label}</Link>
        </p>
    );
}