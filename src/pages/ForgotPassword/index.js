import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
export default function ForgetPassword() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const { email } = data;
    //handle submit here
  };

  return (
    <div className="space">
      <div className="login">
        <div className="login__header">Đặt lại mật khẩu</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-input">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input type="email" name="email" {...register("email")} />
          </div>
          <button type="submit" className="btn btn--border-none btn--full-width">
            Tiếp tục
          </button>
        </form>
        <p className="login__form-panel">
          <Link to="/login">Quay lại</Link>
        </p>
      </div>
    </div>
  );
}
