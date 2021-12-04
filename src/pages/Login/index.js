import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { login } from '../../actions/userAction'
export default function Login() {
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error } = userLogin

  let navigate = useNavigate();

  const onSubmit = (data) => {
    const { email, password } = data;
    dispatch(login(email, password, navigate))
  };

  return (
    <div className="space">
      <div className="login">
        <div className="login__header">Đăng nhập</div>
        {error && <p className="login__error">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-input">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input type="text" name="email" {...register("email")} />
          </div>
          <div className="form-input">
            <label htmlFor="password" className="form-label">
              Mật khẩu
            </label>
            <input type="password" name="password" {...register("password")} />
          </div>
          <button type="submit" className="btn btn--border-none btn--full-width">
            {loading ? "Đang xử lý..." : "Đăng nhập"}
          </button>
        </form>
        <p className="login__form-panel">
          <Link to="/register">Tạo tài khoản mới?</Link>
        </p>
        <p className="login__form-panel">
          <Link to="/#">Quên mật khẩu</Link>
        </p>
      </div>
    </div>
  );
}
