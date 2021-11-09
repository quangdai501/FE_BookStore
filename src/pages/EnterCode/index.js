import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
export default function EnterCode() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const { code } = data;
    //handle submit here
  };

  return (
    <div className="login">
      <div className="login__header">Đặt lại mật khẩu</div>
      <div className="note-reminder">
        Vui lòng kiểm tra email của bạn và nhập mã để tiếp tục
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-input">
          <input
            type="code"
            name="code"
            {...register("code")}
            placeholder="Nhập mã ở đây"
          />
        </div>
        <button type="submit" className="btn btn--border-none btn--full-width">
          Tiếp tục
        </button>
      </form>
      <p className="login__form-panel">
        <Link to="/login">Tôi có tài khoản rồi</Link>
      </p>
    </div>
  );
}
