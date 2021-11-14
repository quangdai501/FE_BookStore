import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './style.scss';
import SideBar from './item/SideBar';
import ProductManagement from '../ProductManagement';
import UserManagement from '../UserManagement';
import AuthorManagement from '../AuthorManagement';
import PublisherManagement from '../PublisherManagement';
import DashBoardHeader from './item/DashBoardHeader';
export default function DashBoard() {
    return (
        <div className="row">
            <DashBoardHeader />
            <div className="col c-2">
                <div className="side-bar">
                    <SideBar />
                </div>
            </div>
            <div className="col c-10">
                <Routes>
                    <Route path="product-management" element={<ProductManagement />} />
                    <Route path="user-management" element={<UserManagement />} />
                    <Route path="author-management" element={<AuthorManagement />} />
                    <Route path="publisher-management" element={<PublisherManagement />} />
                </Routes>
            </div>
        </div>
    )
}
