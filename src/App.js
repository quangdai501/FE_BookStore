import React from "react";
import Home from "./pages/Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useSelector } from 'react-redux';
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import EnterCode from "./pages/EnterCode";
import Checkout from "./pages/Checkout";
import Footer from "./components/Footer";
import ChangePassword from "./pages/ChangePassword";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import DashBoard from "./pages/Admin/DashBoard";
import PrivateRoute from "./components/PrivateRoute";
import Shop from "./pages/Shop";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import OrderSuccess from "./pages/OrderSuccess";
function App() {
  const href = window.location.href;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Router>
      {(href.includes('admin') && userInfo.role === "admin") ? "" :
        <>
          <Header />
          <div className="container main-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/enter-code" element={<EnterCode />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/changepassword" element={<ChangePassword />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route
                path="/product-detail/:productID"
                element={<ProductDetail />}
              />
            </Routes>
          </div>
          <Footer />
        </>}
      <Routes>
        <Route exact element={<PrivateRoute />}>
          <Route exact path="admin/*" element={<DashBoard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
