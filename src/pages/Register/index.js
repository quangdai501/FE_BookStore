import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { confirmEmail, enterCode } from "../../actions/userAction";
import {  useNavigate } from "react-router";
import "./style.scss";
export default function Register() {
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, success, userInfo } = userRegister;
  const userEnterCode = useSelector((state) => state.userEnterCode);
  const {
    loading: loadingEnterCode,
    error: errorEnterCode,
    success: successEnterCode,
    userInfo: userInfoEnterCode,
  } = userEnterCode;

  useEffect(() => {
   if(successEnterCode){
    setTimeout(() => {
      document.location.href = '/login'
    }, 2000);
   }
  }, [successEnterCode]);

  const [isentercode, setIsentercodes] = useState(false);
  const onSubmit = (data) => {
    const { code, name, passwordAgain, password, email } = data;
    // console.log(passwordAgain, password, email);
    if (password !== passwordAgain) {
      setIsMatch(false);
      return;
    } else {
      setIsMatch(true);
    }
    if (Object.keys(errors).length === 0) {
      // console.log(password, email,name);
      //submit form tại đây
      if (code){
        if (isentercode) {
          dispatch(enterCode(code));
          // console.log(code)
        } else {
          // console.log(password, email,name);
          dispatch(confirmEmail(name, email, password));
        }
      }else{
        dispatch(confirmEmail(name, email, password));
      }
     
    }
  };

  return (
    <div className="space">
      <div className="login">
        <div className="login__header">Đăng ký</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-input">
            <label htmlFor="name" className="form-label">
              Họ và tên
            </label>
            <input
              type="name"
              name="name"
              {...register("name", { required: true })}
            />
          </div>
          <div className="form-input">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input type="email" name="email" {...register("email")} />
            {error && <p className="error-label">{error}</p>}
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
          {success && (
            <div className="form-input">
              <label htmlFor="code" className="form-label">
                Mã xác nhận
              </label>
              <p className="">Chúng tôi vừa gủi mã xác nhận đến email của bạn</p>
              {errorEnterCode && (
                <p className="error-label">{errorEnterCode}</p>
              )}
              <input
                type="code"
                name="code"
                {...register("code", { required: true })}
              />
              <button
                type="submit"
                className="reload-btn"
                onClick={() => setIsentercodes(false)}
              >
                Gủi lại <i class="fas fa-sync"></i>
              </button>
            </div>
          )}
          <button
            type="submit"
            className="btn btn--border-none btn--full-width"
            onClick={() => setIsentercodes(true)}
          >
            Đăng ký
          </button>
          {successEnterCode&&<p className="sucess-register">Đăng ký thành công</p>}
        </form>
        <p className="login__form-panel">
          <Link to="/login">Tôi có tài khoản rồi</Link>
        </p>
      </div>
    </div>
  );
}
