import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoute() {
    return (true ? <Outlet /> : <Navigate to="/login" />)
}
