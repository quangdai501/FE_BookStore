import React from "react";
import { Link } from "react-router-dom";
export default function Login() {
  const onSubmit = (data) => console.log(data);

  return (
    <div className="login">
      <div className="login__header">Đăng nhập</div>
      <p className="login__error">Lỗi đăng nhập</p>
      <form onSubmit={onSubmit}>
        <div className="form-input">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input type="email" name="email" />
        </div>
        <div className="form-input">
          <label htmlFor="password" className="form-label">
            Mật khẩu
          </label>
          <input type="password" name="password" />
        </div>

        <button type="submit" className="btn btn--border-none btn--full-width">
          Đăng nhập
        </button>
      </form>
      <p className="login__form-panel">
        <Link to="/#">Tạo tài khoản mới?</Link>
      </p>
      <p className="login__form-panel">
        <Link to="/#">Quên mật khẩu</Link>
      </p>
    </div>
  );
}
