import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { enterCodeResetPass, forgotPassword } from "../../actions/userAction";
import { useEffect } from "react";

export default function EnterCode() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [enterCode, SetEnterCode] = useState(false);

  const userEnterCode = useSelector((state) => state.userEnterCode);
  const {
    loading,
    error,
  } = userEnterCode;
  const { emailInfo, loading: sendMailProcess } = useSelector(state => state.forgotPassword);

  const onSubmit = (data) => {
    const { code } = data;
    if (code) {
      dispatch(enterCodeResetPass(code, navigate))
    }
  };
  useEffect(() => {
    if (!emailInfo?.email) {
      navigate("/forgot-password")
    }
  }, [])
  const onSendMail = () => {
    if (emailInfo.email) {
      SetEnterCode(true);
      dispatch(forgotPassword(emailInfo.email, navigate));
    }
  }
  useEffect(() => {
    if (!enterCode) SetEnterCode(true);
  }, [emailInfo?.email])
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
              {...register("code", { required: true })}
              placeholder="Nhập mã ở đây"
            />
            {error && (
              <p className="error-label">{error}</p>
            )}
          </div>
          <button
            type="submit"
            className="reload-btn"
            onClick={() => onSendMail()}
          >
            {(sendMailProcess && enterCode) ? 'Gửi lại...' : 'Gửi lại'} <i class="fas fa-sync"></i>
          </button>
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
