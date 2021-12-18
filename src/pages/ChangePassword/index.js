import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
export default function ChangePassword() {
  const [isMatch, setIsMatch] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const passwordPattern = {
    value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
    message:
      "Mật khẩu phải chứa ít nhất một số và một chữ cái viết hoa và viết thường và ít nhất 8 ký tự trở lên",
  };
  const onSubmit = (data) => {
    const { passwordAgain, password, prepass } = data;
    console.log(passwordAgain, password, prepass);
    if (password !== passwordAgain) {
      setIsMatch(false);
      return;
    } else {
      setIsMatch(true);
    }
    if (Object.keys(errors).length === 0) {
      //submit form tại đây
    }
  };

  return (
    <div className="space">
      <div className="login">
        <div className="login__header">Đổi mật khẩu</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-input">
            <label htmlFor="prepass" className="form-label">
              Mật khẩu trước đây
            </label>
            <input type="password" name="prepass" {...register("prepass", { pattern: passwordPattern })} />
          </div>
          <div className="form-input">
            <label htmlFor="password" className="form-label">
              Mật khẩu
            </label>
            <input
              type="password"
              name="password"
              {...register("password", { pattern: passwordPattern })}
            />
          </div>
          <div className="form-input">
            <label htmlFor="passwordAgain" className="form-label">
              Nhập lại mật khẩu
            </label>
            <input
              type="password"
              name="passwordAgain"
              {...register("passwordAgain")}
            />
            {errors.password && (
              <p className="error-label">{errors.password.message}</p>
            )}
            {!isMatch && <p className="error-label">Mật khẩu không khớp</p>}
          </div>
          <button type="submit" className="btn btn--border-none btn--full-width">
            Đổi mật khẩu
          </button>
        </form>

      </div>
    </div>
  );
}
