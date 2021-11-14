import React from 'react'
import './style.scss';
import { Link, useMatch } from 'react-router-dom'
export default function SideBar() {
    return (
        <nav className="nav-bar">

            <MenuLink
                to="/admin/product-management"
                label="Quản lý sản phẩm"
                icon={<i class="fas fa-book"></i>}
            />
            <MenuLink
                to="/admin/user-management"
                label="Quản lý người dùng"
                icon={<i class="fas fa-users"></i>}

            />
            <MenuLink
                to="/admin/author-management"
                label="Quản lý tác giả"
                icon={<i class="fas fa-user-tie"></i>}

            />
            <MenuLink
                to="/admin/publisher-management"
                label="Quản lý nhà xuất bản"
                icon={<i class="fas fa-list"></i>}
            />
        </nav>
    )
}


const MenuLink = ({
    label,
    to,
    icon
}) => {
    let match = useMatch(to);
    var active = match ? 'active-link' : '';
    const Icon = () => <>{icon}</>
    return (
        <p className={`nav-bar__item ${active}`}>
            <Icon />
            <Link to={to} className="link side-bar__item">{label}</Link>
        </p>
    );
}