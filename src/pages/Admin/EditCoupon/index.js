import React, { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { useForm } from "react-hook-form";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from 'react-query'

import "./style.scss";
import Toast from "../../../components/Toast";
import couponApi from "../../../api/couponApi";
import { discountTypes, userRanks } from "../../../common/discount.common";
import { useParams } from "react-router-dom";

export default function EditCoupon() {
  const {id} = useParams();

  const { handleSubmit, register, reset } = useForm();
  const [begin, setBegin] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [type, setType] = useState("NUMBER");
  const [success, setSuccess] = useState(false)


  useEffect(() => {
    const fetchData =async()=>{
      try {
        const {data} = await couponApi.getById(id);
        setBegin(new Date(data.begin));
        setEnd(new Date(data.end));
        reset(data);
       } catch (error) {
        console.log(error)
       }
    }
    fetchData()
  }, [])
  

  const onChangeType=(e)=>{
    setType(String(e.target.value))
  }

  const onSubmit = async (data) => {
    const newData={...data}
    newData.begin=begin.getTime();
    newData.end=end.getTime()
    try {
      await couponApi.updateCoupon(newData);
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
      }, 1000);
    } catch (error) {
    }
  };
  return (
    <div className="container">
      {success &&  <Toast message={"Lưu mã giảm giá thành công"} type={"success"} />}
      {/* {error &&<Toast message={error} type={"error"} />} */}
      <div className="create-product">
        <div className="create-title">Thêm mã giảm giá mới</div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row gutter">
            <div className="padding c-12 md-12">
              <div className="form-input">
                <label htmlFor="code" className="form-label">
                  Mã
                </label>
                <input
                  type="text"
                  name="code"
                  {...register("code", {
                    required: true,
                  })}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="row gutter">
            <div className="padding c-6 md-12">
              <div className="date-picker">
                <label htmlFor="price" className="form-label">
                  Từ ngày
                </label>
                <DateTimePicker
                  className="full-width"
                  onChange={setBegin}
                  value={begin}
                />
              </div>
            </div>
            <div className="padding c-6 md-12">
              <div className="date-picker">
                <label htmlFor="price" className="form-label">
                  Đến ngày
                </label>
                <DateTimePicker
                  className="full-width"
                  onChange={setEnd}
                  value={end}
                />
              </div>
            </div>
          </div>
          <div className="row gutter">
            <div className="padding c-6 md-12">
              <div className="form-select">
                <label htmlFor="discount_type" className="form-label">
                  Kiểu giảm giá
                </label>
                <select
                  name="discount_type"
                  {...register("discount_type", {
                    required: true,
                  })}
                  onChange={onChangeType}
                >
                  {discountTypes.map((item, index) => (
                    <option value={item.value} key={index}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="padding c-6 md-12">
              <div className="form-input">
                <label htmlFor="discount" className="form-label">
                  Giảm giá
                </label>
                <input
                  type="number"
                  name="discount"
                  max={type==="NUMBER"?999999999:100 }
                  {...register("discount", { required: true,})}
                />
              </div>
            </div>
          </div>
          <div className="row gutter">
            <div className="padding c-6 md-12">
              <div className="form-input">
                <label htmlFor="min_order" className="form-label">
                  Đơn đối thiểu
                </label>
                <input
                  type="number"
                  name="min_order"
                  {...register("min_order", {
                    required: true,
                  })}
                />
              </div>
            </div>
            <div className="padding c-6 md-12">
              <div className="form-input">
                <label htmlFor="max_discount" className="form-label">
                  Giảm tối đa
                </label>
                <input
                  type="number"
                  name="max_discount"
                  {...register("max_discount", { required: true })}
                />
              </div>
            </div>
          </div>
          <div className="row gutter">
            <div className="padding c-12 md-12">
              <div className="form-input">
                <label htmlFor="price" className="form-label">
                  Số lượng
                </label>
                <input
                  type="number"
                  name="available"
                  {...register("available", {
                    required: true,
                  })}
                />
              </div>
            </div>
          </div>
          <div className="row gutter">
            <div className="padding c-12 md-12">
              <div className="form-select">
                <label htmlFor="point_condition" className="form-label">
                  Thành viên
                </label>
                <select
                  name="point_condition"
                  {...register("point_condition", {
                    required: true,
                  })}
                >
                  {userRanks.map((item, index) => (
                    <option value={item.value} key={index}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            </div>
          <div className="row gutter">
            <div className="padding c-12 md-12">
              <div className="form-input">
                <label htmlFor="description" className="form-label">
                  Mô tả
                </label>
                <input
                  type="text"
                  name="description"
                  {...register("description", {
                    required: true,
                  })}
                />
              </div>
            </div>
          </div>

          <div className="submit-area">
            <button
              type="submit"
              className="btn btn--border-none btn--color-second"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
