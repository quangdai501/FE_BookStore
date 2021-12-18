import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { enterCodeResetPass } from "../../actions/userAction";

export default function EnterCode() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userEnterCode = useSelector((state) => state.userEnterCode);
  const {
    loading,
    error,
  } = userEnterCode;
  const onSubmit = (data) => {
    const { code } = data;
    if (code) {
      dispatch(enterCodeResetPass(code, navigate))
    }
  };

  return (
    <div className="space">
      <div className="login">
        <div className="login__header">Đặt lại mật khẩu</div>
        <div className="note-reminder">
          Vui lòng kiểm tra email của bạn và nhập mã để tiếp tục
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-input">
            <input
              type="number"
              name="code"
              {...register("code")}
              placeholder="Nhập mã ở đây"
            />
            {error && (
              <p className="error-label">{error}</p>
            )}
          </div>
          <button type="submit" className="btn btn--border-none btn--full-width">
            Tiếp tục {loading ? "..." : ""}
          </button>
        </form>
        <p className="login__form-panel">
          <Link to="/login" className="link">Tôi có tài khoản rồi</Link>
        </p>
      </div>
    </div>
  );
}
