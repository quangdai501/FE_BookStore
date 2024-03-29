import React, { useEffect, useLayoutEffect, useRef } from "react";
import Home from "./pages/Home";
import { Route, BrowserRouter as Router, Routes, useMatch } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
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
import NotFound from "./pages/NotFound";
import MyOrders from "./pages/MyOrders";
import ResetPassword from "./pages/ResetPassword";
import { CART_ADD_RESET } from './constants/cart';
import Toast from './components/Toast';
import MessengerCustomerChat from 'react-messenger-customer-chat';
const TIME_OUT = 200;

function App() {
  const href = window.location.href;
  const { success, loading } = useSelector(state => state.cart)
  const userLogin = useSelector((state) => state.userLogin);
  const dispatch = useDispatch()
  const { userInfo } = userLogin;
  useLayoutEffect(() => {
    if (success) {
      setTimeout(() => dispatch({ type: CART_ADD_RESET }), TIME_OUT)
    }
    return () => { clearTimeout() }
  }, [success])

  return (
    <Router>
      {(href.includes('admin') && userInfo.role === "admin") ? "" :
        <>
          {!href.includes('cart') && loading && <Toast message="Đã thêm vào giỏ hàng" type="success" position="top" />}
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
              <Route path="/resetpassword" element={<ResetPassword />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/myorder" element={<MyOrders />} />
              <Route
                path="/product-detail/:productID"
                element={<ProductDetail />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <MessengerCustomerChat
            pageId="111476998238351"
            appId="386867046710656"
          />
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
