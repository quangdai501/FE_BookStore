import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './style.scss';
import SideBar from './item/SideBar';
import ProductManagement from '../ProductManagement';
import UserManagement from '../UserManagement';
import AuthorManagement from '../AuthorManagement';
import PublisherManagement from '../PublisherManagement';
import DashBoardHeader from './item/DashBoardHeader';
import AddProduct from '../AddProduct';
import Statistics from '../Statistics';
import EditProduct from '../EditProduct';
import OverView from './item/OverView';
import CategoryManagement from '../CategoryManagement';
import OrderManagement from '../OrderManagement';
export default function DashBoard() {
    const [isShow, setIsShow] = useState(false);
    const openSidebar = () => {
        setIsShow(!isShow)
    }
    return (
        <div className="dashboard">
            <div className={`dashboard__side lg-0 mobile-sidebar ${isShow ? 'active' : ''}`}>
                <div className="menu-close c-0" onClick={() => openSidebar()}>
                    <i class="fas fa-times"></i>
                </div>
                <div className="side-bar">
                    <SideBar />
                </div>
            </div>
            <div className="dashboard__body">
                <DashBoardHeader
                    openSidebar={openSidebar}
                />
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<OverView />} />
                        <Route path="product" element={<ProductManagement />} />
                        <Route path="product/create" element={<AddProduct />} />
                        <Route path="product/edit/:productId" element={<EditProduct />} />
                        <Route path="order" element={<OrderManagement />} />
                        <Route path="user" element={<UserManagement />} />
                        <Route path="author" element={<AuthorManagement />} />
                        <Route path="author/create" element={<AuthorManagement />} />
                        <Route path="publisher" element={<PublisherManagement />} />
                        <Route path="publisher/create" element={<PublisherManagement />} />
                        <Route path="statistics" element={<Statistics />} />
                        <Route path="category" element={<CategoryManagement />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}
