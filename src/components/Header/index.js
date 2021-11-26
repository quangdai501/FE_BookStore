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
    <div className="main-header">
      <div className="container header-body">
        <div className="row">
          <div className="c-2">
            <div className="logo" onClick={gotoShop}>LogoStore</div>
          </div>
          <div className="c-8">
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
          <div className="c-2">
            <div className="header-right">
              <div className="row">
                <div className="c-6">
                  <div className="cart" onClick={gotoCart}>
                    <i class="fas fa-shopping-bag"></i>
                    <span className="cart__notify">{cartItems.length}</span>
                  </div>
                </div>
                <div className="c-6">
                  {userInfo ? (
                    <div className="signin">
                      <div class="dropdown">
                        <span >{userInfo.name} <i class="fas fa-caret-down"></i></span>
                        <div class="dropdown-content">
                          <span onClick={gotoProfile}>Thông tin cá nhân</span>
                          <span onClick={logoutHandler}>Đăng xuất</span>
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
      </div>
    </div>
  );
}
