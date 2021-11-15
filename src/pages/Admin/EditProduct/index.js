import React, { useState } from 'react';
import './style.scss';
import { useForm } from 'react-hook-form';
import TextEditer from '../../../components/TextEditer';
import UpLoadImage from '../../../components/UpLoadImage';
export default function EditProduct() {
    const { handleSubmit, register } = useForm();
    const initContent = '';
    const [desc, setDesc] = useState('');
    const handleDesc = (content) => {
        setDesc(content);
    }
    const onSubmit = (data) => {
        console.log(data)
        console.log(desc);
    }
    return (
        <div className="container">
            <div className="create-product">
                <div className="create-title">Sửa thông tin sản phẩm</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-input">
                        <label htmlFor="name" className="form-label">
                            Tên sản phẩm
                        </label>
                        <input type="name" name="name" {...register("name")} />
                    </div>
                    <div className="row">
                        <div className="col c-6 pr-20">
                            <div className="form-input">
                                <label htmlFor="price" className="form-label">
                                    Giá
                                </label>
                                <input type="number" name="price" {...register("price")} />
                            </div>

                        </div>
                        <div className="col c-6 pl-20">
                            <div className="form-input">
                                <label htmlFor="quantity" className="form-label">
                                    Số lượng
                                </label>
                                <input type="number" name="quantity" {...register("quantity")} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col c-6 pr-20">
                            <div className="form-select">
                                <label htmlFor="author" className="form-label">
                                    Tác giả
                                </label>
                                <select name="author" {...register("author")}>
                                    {[1, 2, 3].map((item) => (
                                        <option value={item} key={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col c-6 pl-20">
                            <div className="form-select">
                                <label htmlFor="publisher" className="form-label">
                                    Nhà xuất bản
                                </label>
                                <select name="publisher" {...register("publisher")}>
                                    {[1, 2, 3].map((item) => (
                                        <option value={item} key={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <UpLoadImage />
                    <label htmlFor="publisher" className="form-label">
                        Mô tả sản phẩm
                    </label>
                    <TextEditer
                        handleDesc={handleDesc}
                        initContent={initContent}
                    />
                    <div className="submit-area">
                        <button type="submit" className="btn btn--border-none">
                            Lưu thay đổi
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
