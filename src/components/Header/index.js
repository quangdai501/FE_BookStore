import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../actions/userAction";
import "./style.scss";
export default function Header() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [query, setQuery] = useState("");
  const changeQuery = (e) => setQuery(e.target.value);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  let navigate = useNavigate();
  const gotoCart = () => {
    navigate("/cart");
  };
  const gotoLogin = () => {
    navigate("/login");
  };
  const gotoProfile = () => {
    navigate("/profile");
  };
  const gotoShop = () => {
    navigate("/shop");
  };
  const goToAdmin = () => {
    window.location.href = process.env.REACT_APP_REPLACE_URL || "https://bookstoreute.netlify.app/admin";
  };
  const Search = () => {
    navigate({
      pathname: "shop",
      search: `search=${query}`,
    });
  };
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header className="main-header">
      <div className="container header-body">
        <div className="row gutter">
          <div className="c-3 lg-4 md-5 padding">
            <div className="logo" onClick={gotoShop}><img src="/images/logo.png" alt="logo" /></div>
          </div>
          <div className="c-6 lg-8 md-7 padding">
            <div className="search">
              <input
                onChange={changeQuery}
                type="text"
                className="search-input"
                value={query}
              />
              <p className="search-icon" onClick={Search}>
                <i class="fas fa-search"></i>
              </p>
            </div>
          </div>
          <div className="c-3">
            <div className="row header-right">
              <div className="c-4 header-logo">
                <div className="cart" onClick={gotoCart}>
                  <i class="fas fa-shopping-bag"></i>
                  <span className="cart__notify">{cartItems.length}</span>
                </div>
              </div>
              <div className="c-8">
                {userInfo ? (
                  <div className="signin">
                    <div class="dropdown">
                      <span >{userInfo.name} <i class="fas fa-caret-down"></i></span>
                      <div class="dropdown-content">
                        <span onClick={gotoProfile}>Thông tin cá nhân</span>
                        <span onClick={logoutHandler}>Đăng xuất</span>
                        {userInfo.role === "admin" && <span onClick={goToAdmin}>Trang admin</span>}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="signin" onClick={gotoLogin}>
                    Đăng nhập
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
