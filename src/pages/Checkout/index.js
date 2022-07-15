import axios from "axios";
import React, { useMemo, useState, useEffect, useCallback } from "react";
import _, { debounce } from "lodash";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder, sendMailOrder } from "../../actions/orderAction";
import { priceToString } from "../../common/convertNumberToPrice";
import Item from "./item";
import { CART_CLEAR_ITEMS } from "../../constants/cart";
import "./style.scss";
import couponApi from "../../api/couponApi";
const Checkout = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [currentDistrict, setCurrentDistrict] = useState(1452);
  const [currentWardCode, setCurrentWardCode] = useState("21012");
  const [coupon, setCoupon] = useState({ discount: 0 });
  const [couponErr, setCouponErr] = useState();
  const [shippingFee, setShippingFee] = useState(15000);
  const orderInfo = useSelector((state) => state.createOrder);
  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { sendingProcess } = useSelector((state) => state.sendMailOrder);
  const { createOrderProcess } = orderInfo;
  const { cartItems } = cart;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("name", userInfo?.name);
    setValue("phone", userInfo?.phone);
  }, []);
  const getProvince = async () => {
    const {
      data: { data },
    } = await axios.get(
      `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province`,
      {
        headers: {
          token: "ef8f9c13-2315-11ec-b8c6-fade198b4859",
        },
      }
    );

    setProvinces(
      data.reduce((list, item) => {
        list.push({
          ProvinceID: item.ProvinceID,
          ProvinceName: item.ProvinceName,
        });
        return list.sort(
          (first, second) => first.ProvinceID - second.ProvinceID
        );
      }, [])
    );
  };
  const getDistrict = async (ProvinceID) => {
    try {
      const {
        data: { data },
      } = await axios.get(
        `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${ProvinceID}`,
        {
          headers: {
            token: "ef8f9c13-2315-11ec-b8c6-fade198b4859",
          },
        }
      );
      setDistricts(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getWard = async (districtID) => {
    try {
      const {
        data: { data },
      } = await axios.get(
        `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtID}`,
        {
          headers: {
            token: "ef8f9c13-2315-11ec-b8c6-fade198b4859",
          },
        }
      );
      setWards(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getShippingFee = useCallback(async () => {
    const body = {
      from_district_id: 1459,
      service_id: 53320,
      service_type_id: null,
      to_district_id: currentDistrict,
      to_ward_code: currentWardCode,
      height: cartItems.length,
      length: 20,
      weight: 100 * cartItems.length,
      width: 10,
      insurance_value: 10000,
      coupon: null,
    };
    try {
      const {
        data: { data },
      } = await axios.post(
        `https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee`,
        body,
        {
          headers: {
            token: "e4822a9f-4eba-11ec-ac64-422c37c6de1b",
            ShopId: "83990",
          },
        }
      );

      setShippingFee(data.total);
    } catch (e) {
      console.log(e);
    }
  }, [currentDistrict, currentWardCode]);

  const onChangeProvince = (e) => {
    const name = e.target.value;
    const province = provinces.find((item) => item.ProvinceName === name);
    getDistrict(province.ProvinceID);
  };

  const onChangeDistrict = (e) => {
    const name = e.target.value;
    const district = districts.find((item) => item.DistrictName === name);
    getWard(district.DistrictID);
    setCurrentDistrict(district.DistrictID);
  };
  const onChangeWard = (e) => {
    const name = e.target.value;
    const ward = wards.find((item) => item.WardName === name);
    setCurrentWardCode(ward?.WardCode);
  };
  const dispatch = useDispatch();

  const totalCart = useMemo(
    () =>
      cartItems.reduce((total, item) => (total += item.price * item.qty), 0),
    [cartItems]
  );

  const billDetail = useMemo(
    () =>
      cartItems.reduce((list, currItem) => {
        list.push({
          productId: currItem.product,
          name: currItem.name,
          image: currItem.image,
          price: currItem.price,
          qty: currItem.qty,
        });
        return list;
      }, []),
    [cartItems]
  );

  const phonePatterm = {
    value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
    message: "Số điện thoại có 10 chữ số, chứa các chữ số 0-9",
  };

  const onSubmit = async (data) => {
    console.log(data);
    if (data) {
      const address = {
        to_ward_code: Number(
          wards.find((item) => item.WardName === data.village).WardCode
        ),
        to_district_id: Number(
          districts.find((item) => item.DistrictName === data.district)
            .DistrictID
        ),
        province: data.province,
        district: data.district,
        ward: data.village,
        detail: data.address,
      };
      if (data.payment === "online") {
        await dispatch(
          createOrder(
            userInfo._id,
            data.name,
            totalCart + shippingFee + coupon.discount,
            address,
            data.phone,
            billDetail,
            "Thanh toán online",
            coupon.discount?coupon:{},
          )
        );
      } else {
        await dispatch(
          createOrder(
            userInfo._id,
            data.name,
            totalCart + shippingFee + coupon.discount,
            address,
            data.phone,
            billDetail,
            "Thanh toán khi nhận hàng",
            navigate,
            coupon.discount?coupon:{},
          )
        );
        await dispatch(sendMailOrder(userInfo, cartItems));
        await dispatch({ type: CART_CLEAR_ITEMS });
      }
    }
  };

  const checkCoupon = async (code) => {
    let err = "";
    let cp = { discount: 0 };
    if (code) {
      try {
        const {
          data: { isValid, data },
        } = await couponApi.isValidCoupon({ code, total: totalCart });
        if (isValid) {
          const discount =
            data.discount_type === "NUMBER"
              ? data.discount
              : data.discount * totalCart;
          const maxDiscount = Math.max(data.max_discount, discount);
          cp = { discount: -maxDiscount, code: code };
        }
      } catch (error) {
        err = error.response.data.message;
      }
    }
    setCoupon(cp);
    setCouponErr(err);
  };
  const debounceInput = useCallback(
    debounce((code) => checkCoupon(code), 1000),
    []
  );

  function handleInputOnchange(e) {
    const { value } = e.target;
    debounceInput(value);
  }

  useEffect(() => {
    getProvince();
  }, []);
  useEffect(() => {
    if (currentDistrict && currentWardCode) {
      getShippingFee();
    }
  }, [currentDistrict, currentWardCode]);

  return (
    <div className="checkout space">
      <h1>Thanh toán</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="row gutter checkout-session"
      >
        <div className="c-6 lg-6 md-12 padding center-item">
          <div className="Billing-details checkout-info">
            <h3 className="title mb-15 text-center">Thông tin khách hàng</h3>
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
                {...register("phone", {
                  required: true,
                  pattern: phonePatterm,
                })}
              />
              {errors.phone && (
                <p className="error-label">{errors.phone.message}</p>
              )}
            </div>
            <div className="form-select">
              <label htmlFor="province" className="form-label">
                Tỉnh, Thành phố
              </label>
              <select
                name="province"
                {...register("province", { required: true })}
                onChange={onChangeProvince}
              >
                <option defaultValue value="">
                  Chọn Tỉnh, Thành phố
                </option>
                {provinces?.map((item) => (
                  <option value={item.ProvinceName} key={item.ProvinceID}>
                    {item.ProvinceName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-select">
              <label htmlFor="district" className="form-label">
                Quận, Huyện
              </label>
              <select
                name="district"
                {...register("district", { required: true })}
                onChange={onChangeDistrict}
              >
                <option defaultValue value="">
                  Chọn Quận, Huyện
                </option>
                {districts.map((item) => (
                  <option value={item.DistrictName} key={item.DistrictID}>
                    {item.DistrictName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-select">
              <label htmlFor="village" className="form-label">
                Xã, Phường
              </label>
              <select
                name="village"
                {...register("village", { required: true })}
                onChange={onChangeWard}
              >
                <option defaultValue value="">
                  Chọn Xã, Phường
                </option>
                {wards.map((item) => (
                  <option value={item.WardName} key={item.WardCode}>
                    {item.WardName}
                  </option>
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
        </div>
        <div className="c-6 lg-6 md-12 padding">
          <div className="Orders shadow">
            <h3 className="title mb-15 text-center">Sản phẩm của bạn</h3>
            <div className="order-row">
              {cartItems ? (
                cartItems.map((item, index) => <Item cart={item} key={index} />)
              ) : (
                <></>
              )}
            </div>
            <div className="order-row">
              <div className="row">
                <p className=" col c-8 md-6">Tổng giỏ hàng:</p>
                <div className="col c-4 md-6">{priceToString(totalCart)}</div>
              </div>
            </div>
            <div className="order-row">
              <div className="row">
                <p className=" col c-8 md-12">Chi phí vận chuyển:</p>
                <div className="col c-4 md-12">
                  {priceToString(shippingFee)}
                </div>
              </div>
            </div>
            <div className="order-row">
              <div className="row">
                <h3 className=" col c-6 md-6">Mã giảm giá: </h3>
                <input
                  className=" col c-6 md-6"
                  onChange={handleInputOnchange}
                />
                {couponErr && <p className="coupon-err">{couponErr}</p>}
              </div>
            </div>
            <div className="order-row">
              <div className="row">
                <h3 className=" col c-8 md-6">Tổng: </h3>
                <h3 className=" col c-4 md-6">
                  {priceToString(shippingFee + totalCart + coupon.discount)}
                </h3>
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
                <label htmlFor="payment text-sm">
                  Thanh toán bằng tiền mặt
                </label>
              </div>
              <div className="row sub-title">
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  {...register("payment")}
                />
                <label htmlFor="payment text-sm">
                  Thanh toán bằng ví điện tử vnpay
                </label>
                <img className="payment-logo" src="./images/vnpay.png" alt="" />
              </div>
            </div>
            <div className="order-row">
              <button
                className="btn btn--border-none btn--full-width"
                type="submit"
              >
                {createOrderProcess || sendingProcess
                  ? "Đang xử lý..."
                  : "Đặt hàng"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
