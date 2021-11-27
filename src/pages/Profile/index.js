import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserDetails, updateUserProfile } from "../../actions/userAction";
import "./style.scss";
const Profile = () => {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success: successUpdate } = userUpdateProfile;

  const defaultValues = user;
  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm({ defaultValues });

  useEffect(() => {
    dispatch(getUserDetails());
  }, []);

  useEffect(() => {
    reset(user);
    // console.log(userdetail);
  }, [JSON.stringify(user)]);

  const onSubmit = (data) => {
    if (data) {
      // console.log(data);
      const phone = data.phone ? { phone: data.phone } : {};
      const address = data.address ? { address: data.address } : {};
      const user = {
        name: data.name,
        ...phone,
        ...address,
      };
      dispatch(updateUserProfile(user));
    }
    //handle submit here
  };
  return (
    <div className="space myaccount ">
      <h1>Thông tin</h1>
      <div className="myaccount-form row">
        <form onSubmit={handleSubmit(onSubmit)} className="col c-6 md-12">
          <div className="form-input">
            <label htmlFor="name" className="form-label">
              Họ và tên
            </label>
            <input
              type="name"
              name="name"
              {...register("name", {
                required: true,
              })}
              placeholder=""
            />
          </div>
          <div className="form-input">
            <label htmlFor="phone" className="form-label">
              Sdt
            </label>
            <input
              type="phone"
              name="phone"
              {...register("phone")}
              placeholder=""
            />
          </div>
          <div className="form-input">
            <label htmlFor="address" className="form-label">
              Địa chỉ
            </label>
            <input
              type="address"
              name="address"
              {...register("address")}
              placeholder=""
            />
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

export default Profile;
