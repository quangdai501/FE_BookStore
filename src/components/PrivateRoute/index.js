import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function PrivateRoute() {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    return (userInfo.role === "admin" ? <Outlet /> : <Navigate to="/login" />)
}
