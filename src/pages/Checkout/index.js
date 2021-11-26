import axios from "axios";
import React, { useMemo, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../actions/orderAction';
import { province } from "../Utils/province";
import { priceToString } from "../../common/convertNumberToPrice";
import Item from "./item";
import "./style.scss";
const Checkout = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);


  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const shippingFee = 15000;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const provinceList = useMemo(() => {
    const newList = JSON.stringify(province);
    return JSON.parse(newList).data.reduce((list, item) => {
      list.push({
        ProvinceID: item.ProvinceID,
        ProvinceName: item.ProvinceName
      });
      return list.sort();
    }, [])
  }, []);

  const getProvince = async () => {
    const { data: { data } } = await axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province`, {
      headers: {
        token: "ef8f9c13-2315-11ec-b8c6-fade198b4859",
      }
    })

    setProvinces(data.reduce((list, item) => {
      list.push({
        ProvinceID: item.ProvinceID,
        ProvinceName: item.ProvinceName
      });
      return list.sort();
    }, []));
  }
  const getDistrict = async (ProvinceID) => {
    const { data: { data } } = await axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${ProvinceID}`, {
      headers: {
        token: "ef8f9c13-2315-11ec-b8c6-fade198b4859",
      }
    })
    setDistricts(data);
  }
  const getWard = async (districtID) => {
    const { data: { data } } = await axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtID}`, {
      headers: {
        token: "ef8f9c13-2315-11ec-b8c6-fade198b4859",
      }
    })
    setWards(data);
  }

  const onChangeProvince = (e) => {
    const name = e.target.value;
    const province = provinceList.find(item => item.ProvinceName === name);
    console.log(province.ProvinceID);
    getDistrict(province.ProvinceID);
  }

  const onChangeDistrict = (e) => {
    const name = e.target.value;
    const district = districts.find(item => item.DistrictName === name);
    console.log(district.DistrictID);
    getWard(district.DistrictID);
  }


  const userLogin = useSelector((state) => state.userLogin);

  const dispatch = useDispatch();

  const totalCart = useMemo(() =>
    cartItems.reduce((total, item) => total += item.price * item.qty, 0), [cartItems]);

  const billDetail = useMemo(() =>
    cartItems.reduce((list, currItem) => {
      list.push({
        productId: currItem.product,
        name: currItem.name,
        image: currItem.image,
        price: currItem.price,
        qty: currItem.qty,
      })
      return list
    }, []), [cartItems]);

  const phonePatterm = {
    value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
    message: "Số điện thoại có 10 chữ số, chứa các chữ số 0-9",
  };

  const onSubmit = (data) => {
    if (data) {
      const address = {
        to_ward_code: Number(wards.find(item => item.WardName === data.village).WardCode),
        to_district_id: Number(districts.find(item => item.DistrictName === data.district).DistrictID),
        province: data.province,
        district: data.district,
        ward: data.village,
        detail: data.address,
      }
      if (data.payment === "online") {
        dispatch(createOrder(userLogin._id, data.name, totalCart, address, data.phone, billDetail, "Thanh toán online"));
      }
      else {
        dispatch(createOrder(userLogin._id, data.name, totalCart, address, data.phone, billDetail, "Thanh toán khi nhận hàng"));
      }
    }
  };

  useEffect(() => {
    getProvince()
  }, [])
  return (
    <div className="checkout">
      <h1>Thanh toán</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="row checkout-session">
        <div className="Billing-details col c-6 lg-12 padding">
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
            <select name="province" {...register("province")} onChange={onChangeProvince}>
              {provinces?.map((item) => (
                <option value={item.ProvinceName} key={item.ProvinceID}>{item.ProvinceName}</option>
              ))}
            </select>
          </div>
          <div className="form-select">
            <label htmlFor="district" className="form-label">
              Quận, Huyện
            </label>
            <select name="district" {...register("district")} onChange={onChangeDistrict}>
              {districts.map((item) => (
                <option value={item.DistrictName} key={item.DistrictID}>{item.DistrictName}</option>
              ))}
            </select>
          </div>
          <div className="form-select">
            <label htmlFor="village" className="form-label">
              Xã, Phường
            </label>
            <select name="village" {...register("village")}>
              {wards.map((item) => (
                <option value={item.WardName} key={item.WardCode}>{item.WardName}</option>
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
              {...register("address", { required: true })}
            />
          </div>
        </div>
        <div className="Orders col c-6 lg-12 padding">
          <div className="order-row">
            <h3 className="title">Sản phẩm của bạn:</h3>

            {cartItems ? cartItems.map((item, index) => (
              <Item cart={item} key={index} />
            )) : <></>}
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
              <h3 className=" col c-4">{priceToString(shippingFee + totalCart)}</h3>
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
