import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { priceToString } from "../../common/convertNumberToPrice";
import Item from "./item";
import "./style.scss";
const Checkout = () => {


  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const totalCart=cartItems?cartItems.reduce((s,i)=>s+(i.qty*i.price),0):0
  const shippingFee=15000

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const phonePatterm = {
    value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
    message: "Số điện thoại có 10 chữ số, chứa các chữ số 0-9",
  };
  const onSubmit = (data) => {
    if (data) {
      console.log(data);
    }
    //handle submit here
  };
  return (
    <div className="checkout">
      <h1>Thanh toán</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="row checkout-session">
        <div className="Billing-details col c-5 md-12">
          <div className="form-input">
            <label htmlFor="name" className="form-label">
              Tên người nhận
            </label>
            <input
              type="text"
              name="name"
              {...register("name", { required: true, maxLength: 20 })}
            />
          </div>
          <div className="form-input">
            <label htmlFor="phone" className="form-label">
              Số điện thoại
            </label>
            <input
              type="text"
              name="phone"
              {...register("phone", { required: true, pattern: phonePatterm })}
            />
            {errors.phone && (
              <p className="error-label">{errors.phone.message}</p>
            )}
          </div>
          <div className="form-select">
            <label htmlFor="province" className="form-label">
              Tỉnh, Thành phố
            </label>
            <select name="province" {...register("province")}>
              {[1, 2, 3].map((item) => (
                <option value={item}>{item}</option>
              ))}
            </select>
          </div>
          <div className="form-select">
            <label htmlFor="district" className="form-label">
              Quận, Huyện
            </label>
            <select name="district" {...register("district")}>
              {[1, 2, 3].map((item) => (
                <option value={item}>{item}</option>
              ))}
            </select>
          </div>
          <div className="form-select">
            <label htmlFor="village" className="form-label">
              Xã, Phường
            </label>
            <select name="village" {...register("village")}>
              {[1, 2, 3].map((item) => (
                <option value={item}>{item}</option>
              ))}
            </select>
          </div>
          <div className="form-input">
            <label htmlFor="address" className="form-label">
              Địa chỉ
            </label>
            <input
              type="text"
              name="address"
              {...register("address", { required: true, maxLength: 20 })}
            />
          </div>
        </div>
        <div className="Orders col c-5 md-12">
          <div className="order-row">
            <h3 className="title">Sản phẩm của bạn:</h3>

            {cartItems?cartItems.map((item, index) => (
              <Item cart={item} key={index} />
            )):<></>}
          </div>
          <div className="order-row">
            <div className="row">
              <h3 className=" col c-8">Tổng Giỏ hàng:</h3>
              <div className="col c-4">{priceToString(totalCart)}</div>
            </div>
          </div>
          <div className="order-row">
            <div className="row">
              <h3 className=" col c-8">Chi phí vận chuyển:</h3>
              <div className="col c-4">{priceToString(shippingFee)}</div>
            </div>
          </div>
          <div className="order-row">
            <div className="row">
              <h3 className=" col c-8">Tổng: </h3>
              <h3 className=" col c-4">{priceToString(shippingFee+totalCart)}</h3>
            </div>
          </div>
          <div className="order-row">
            <h3 className="title">Phương thức thanh toán: </h3>
            <div className="row sub-title">
              <input
                type="radio"
                defaultChecked={true}
                value="cash"
                name="payment"
                {...register("payment")}
              />
              <label htmlFor="payment">Thanh toán bằng tiền mặt</label>
            </div>
            <div className="row sub-title">
              <input
                type="radio"
                name="payment"
                value="online"
                {...register("payment")}
              />
              <label htmlFor="payment">Thanh toán bằng ví điện tử vnpay</label>
            </div>
          </div>
          <div className="order-row">
            <button
              className="btn btn--border-none btn--full-width"
              type="submit"
            >
              Đặt hàng
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
