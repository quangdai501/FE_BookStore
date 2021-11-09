import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./style.scss";
const MyAccout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data) {
      console.log(data);
    }
    //handle submit here
  };
  return (
    <div className="myaccount">
      <h1>Thông tin</h1>
      <div className="myaccount-form row">
        <form onSubmit={handleSubmit(onSubmit)} className="col c-6 md-12">
        <div className="form-input">
          <label htmlFor="name" className="form-label">
            Họ và tên
          </label>
          <input type="name" name="name" {...register("name")} placeholder="" />
        </div>
        <div className="form-input">
          <label htmlFor="phone" className="form-label">
           Sdt
          </label>
          <input type="phone" name="phone" {...register("phone")} placeholder="" />
        </div>
        <div className="form-input">
          <label htmlFor="address" className="form-label">
            Địa chỉ
          </label>
          <input type="address" name="address" {...register("address")} placeholder="" />
        </div>
        <p className="form-panel">
        <Link to="/changepassword">Đổi mật khẩu</Link>
      </p>
        <button
        className="btn btn--border-none btn--full-width"
        type="submit"
        >
        Lưu
        </button>
        </form>
      </div>
    </div>
  );
};

export default MyAccout;
