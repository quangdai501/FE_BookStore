import React from 'react';
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
export default function DashBoard() {
    return (
        <div className="row">
            <DashBoardHeader />
            <div className="col c-2 flex">
                <div className="side-bar">
                    <SideBar />
                </div>
            </div>
            <div className="col c-10 flex">
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<OverView />} />
                        <Route path="product" element={<ProductManagement />} />
                        <Route path="product/create" element={<AddProduct />} />
                        <Route path="product/edit/:productId" element={<EditProduct />} />
                        <Route path="order" element={<EditProduct />} />
                        <Route path="user" element={<UserManagement />} />
                        <Route path="author" element={<AuthorManagement />} />
                        <Route path="author/create" element={<AuthorManagement />} />
                        <Route path="publisher" element={<PublisherManagement />} />
                        <Route path="publisher/create" element={<PublisherManagement />} />
                        <Route path="statistics" element={<Statistics />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}
