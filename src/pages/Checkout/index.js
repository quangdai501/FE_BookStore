import React from 'react'
import { useForm } from "react-hook-form";

const Checkout = () => {
    const { register, handleSubmit ,formState: { errors }} = useForm();


    const phonePatterm={
        value:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
        message:"Số điện thoại có 10 chữ số, chứa các chữ số 0-9"
    }
    const onSubmit = (data) => {
        if (data){
            console.log(data)
        }
        //handle submit here
      };
    return (
        <div className="checkout">
            <h1>Thanh toán</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="row">
                <div className="Billing-details col c-6 md-12">
    
                    <div className="form-input">
                        <label htmlFor="name" className="form-label">Tên người nhận</label>
                        <input type="text" name="name" {...register("name", { required: true, maxLength: 20 })}/>
                      
                    </div>
                    <div className="form-input">
                        <label htmlFor="phone" className="form-label">Số điện thoại</label>
                        <input type="text" name="phone" {...register("phone", { required: true,pattern: phonePatterm})}/>
                        {errors.phone&&<p className="error-label">{errors.phone.message}</p>}
                    </div>
                    <div className="form-select">
                        <label htmlFor="province" className="form-label">Tỉnh, Thành phố</label>
                        <select name="province" {...register("province")} >
                            {[1,2,3].map((item)=>( <option value={item}>{item}</option>))}
                        </select>
                    </div>
                    <div className="form-select">
                        <label htmlFor="province" className="form-label">Quận, Huyện</label>
                        <select name="province" {...register("province")} >
                            {[1,2,3].map((item)=>( <option value={item}>{item}</option>))}
                        </select>
                    </div>
                    <div className="form-select">
                        <label htmlFor="province" className="form-label">Xã, Phường</label>
                        <select name="province" {...register("province")} >
                            {[1,2,3].map((item)=>( <option value={item}>{item}</option>))}
                        </select>
                    </div>
                    <div className="form-input">
                        <label htmlFor="address" className="form-label">Địa chỉ</label>
                        <input type="text" name="address" {...register("address", { required: true, maxLength: 20 })}/>
                    </div>
                </div>
              <div className="Oders col c-6 md-12">
                    <div className="row oder-row"></div>
                    <button type="submit">Đặt hàng</button>
              </div>
               
            </form>
            
        </div>
    )
}

export default Checkout
