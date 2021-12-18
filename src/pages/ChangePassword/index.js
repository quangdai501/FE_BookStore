import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../actions/userAction";
import { useNavigate } from 'react-router-dom';
import Toast from "../../components/Toast";

export default function ChangePassword() {
  const [isMatch, setIsMatch] = useState(true);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, success, error } = useSelector(state => state.userUpdatePass);
  const [check, setCheck] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    if (password !== passwordAgain) {
      setIsMatch(false);
      return;
    } else {
      setIsMatch(true);
    }
    if (Object.keys(errors).length === 0) {
      setCheck(true);
      dispatch(updatePassword(userInfo.email, prepass, password, navigate));
    }
  };

  return (
    <div className="space">
      {success && check && <Toast message="Cập nhật thành công" type="success" />}
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
            {error && (
              <p className="error-label">{error}</p>
            )}
            {errors.password && (
              <p className="error-label">{errors.password.message}</p>
            )}
            {!isMatch && <p className="error-label">Mật khẩu không khớp</p>}
          </div>
          <button type="submit" className="btn btn--border-none btn--full-width">
            Đổi mật khẩu {loading ? "..." : ""}
          </button>
        </form>

      </div>
    </div>
  );
}
