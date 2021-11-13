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
function App() {
  return (
    <>
      <div className="container">
        <Router>
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
          </Routes>
        </Router>
      </div>
      <Footer />
    </>
  );
}

export default App;
