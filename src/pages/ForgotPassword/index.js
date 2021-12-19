import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../actions/userAction";
export default function ForgetPassword() {
  const { loading, error } = useSelector(state => state.forgotPassword);

  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const { email } = data;
    if (email) {
      dispatch(forgotPassword(email, navigate));
    }
  }
  return (
    <div className="space">
      <div className="login">
        <div className="login__header">Đặt lại mật khẩu</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-input">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input type="email" name="email" {...register("email", { required: true })} />
            {error && (
              <p className="error-label">{error}</p>
            )}
          </div>
          <button type="submit" className="btn btn--border-none btn--full-width">
            Tiếp tục {loading ? "..." : ''}
          </button>
        </form>
        <p className="login__form-panel">
          <Link to="/login" className="link">Quay lại</Link>
        </p>
      </div>
    </div>
  );
}
