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
function App() {
  return (
    <Router>
      <div className="container">
        {/* <div>Day la root file</div> */}
        <Routes>
          <Route path="/" element={<Home />} />
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
      </div>
      <Routes>
        <Route exact element={<PrivateRoute />} >
          <Route exact path="admin/*" element={<DashBoard />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
