import React from "react";
import Home from "./pages/Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import EnterCode from "./pages/EnterCode";
import Checkout from "./pages/Checkout";
import Footer from "./components/Footer";
import MyAccout from "./pages/MyAccout";
import ChangePassword from "./pages/ChangePassword";
import Cart from "./pages/Cart";
import ProductDetail from './pages/ProductDetail';
import DashBoard from "./pages/Admin/DashBoard";
import PrivateRoute from "./components/PrivateRoute";
import ProductManagement from "./pages/Admin/ProductManagement";
import UserManagement from "./pages/Admin/UserManagement";
import PublisherManagement from "./pages/Admin/PublisherManagement";
import AuthorManagement from "./pages/Admin/AuthorManagement";
function App() {
  return (
    <Router>

      <div className="container">
        {/* <div>Day la root file</div> */}
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/enter-code" element={<EnterCode />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/myaccount" element={<MyAccout />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product-detail/:productID" element={<ProductDetail />} />
          <Route path="admin/*" element={<PrivateRoute />} >
            <Route exact path="" element={<DashBoard />} />
            <Route path="product-management" element={<ProductManagement />} />
            <Route path="user-management" element={<UserManagement />} />
            <Route path="author-management" element={<AuthorManagement />} />
            <Route path="publisher-management" element={<PublisherManagement />} />
          </Route>
        </Routes>
      </div>
      <Footer />

    </Router>
  );
}

export default App;
