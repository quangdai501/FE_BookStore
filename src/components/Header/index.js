import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../actions/userAction";
import useKeyPress from "../../hooks/useKeyPress";
import MobileMenu from "../MobileMenu";
import "./style.scss";
export default function Header() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [query, setQuery] = useState("");
  const changeQuery = (e) => setQuery(e.target.value);
  const inputRef = useRef(null);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = () => {
    setOpenMenu(true);
  }

  const handleCloseMenu = () => {
    setOpenMenu(false);
  }

  let navigate = useNavigate();
  const gotoCart = () => {
    navigate("/cart");
  };
  const gotoLogin = () => {
    console.log('run')
    navigate("/login");
  };
  const gotoProfile = () => {
    navigate("/profile");
  };
  const gotoHome = () => {
    navigate("/");
  };
  const gotoMyOrder = () => {
    navigate("/myorder");
  };
  const goToAdmin = () => {
    window.location.href = `${window.location.origin}/admin`;
  };
  const Search = (query) => {
    if (query)
      navigate({
        pathname: "shop",
        search: `search=${query}`,
      });
  };
  const logoutHandler = () => {
    dispatch(logout());
  };
  useKeyPress(inputRef, (q) => Search(q))
  return (
    <header className="main-header">
      <div className="container header-body">
        <div className="row gutter">
          <div className="c-3 lg-4 md-6 padding logo-area">
            <div className="logo" onClick={gotoHome}><img src="/images/logo.png" alt="logo" /></div>
          </div>
          <div className="c-6 lg-6 md-12 padding search-area">
            <div className="search">
              <input
                ref={inputRef}
                onChange={changeQuery}
                type="text"
                className="search-input"
                value={query}
              />
              <p className="search-icon" onClick={() => Search(query)}>
                <i class="fas fa-search"></i>
              </p>
            </div>
          </div>

          <div className="c-0 lg-1 md-3 mobile-menu">
            <div className="row header-right">
              <div className="c-4 header-logo">
                <div className="cart" onClick={gotoCart}>
                  <i class="fas fa-shopping-bag"></i>
                  <span className="cart__notify">{cartItems.length}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="c-0 lg-1 md-3 mobile-menu">
            <div className="menu" onClick={handleOpenMenu}>
              <i class="fas fa-bars"></i>
            </div>
            <MobileMenu
              open={openMenu}
              userInfo={userInfo}
              goToAdmin={goToAdmin}
              gotoCart={gotoCart}
              gotoHome={gotoHome}
              gotoMyOrder={gotoMyOrder}
              gotoProfile={gotoProfile}
              gotoLogin={gotoLogin}
              logoutHandler={logoutHandler}
              handleOpenMenu={handleOpenMenu}
              handleCloseMenu={handleCloseMenu}
            />
          </div>
          <div className="c-3 lg-0 md-0">
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
                        <span onClick={gotoMyOrder}>Lịch sử mua hàng</span>
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
