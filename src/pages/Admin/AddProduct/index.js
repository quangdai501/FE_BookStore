import React, { useEffect, useState } from "react";
import "./style.scss";
import { useForm } from "react-hook-form";
import TextEditer from "../../../components/TextEditer";
import UpLoadImage from "../../../components/UpLoadImage";
import { useDispatch, useSelector } from "react-redux";
import { listAuthors } from "../../../actions/authorAction";
import { listCategorys } from "../../../actions/categoryAction";
import { listPublishers } from "../../../actions/publisherAction";
import { createProduct } from "../../../actions/productAction";

export default function AddProduct() {
  const dispatch = useDispatch();
  const authorList = useSelector((state) => state.authorList);
  const { authors } = authorList;

  const categoryList = useSelector((state) => state.categoryList);
  const { categorys } = categoryList;

  const publisherList = useSelector((state) => state.publisherList);
  const { publishers } = publisherList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product:productcreate
  } = productCreate;

  const defaultValues = {};
  const { handleSubmit, register,reset  } = useForm({ defaultValues });
  useEffect(() => {
    dispatch(listAuthors());
    dispatch(listCategorys());
    dispatch(listPublishers());
  }, []);
  useEffect(() => {
   if(successCreate){
     alert('thêm thành công')
     reset(defaultValues);
     setImg('')
     setDesc('')
   }
  }, [successCreate])
  
  const [desc, setDesc] = useState("");

  const [img, setImg] = useState("");
  const changeImg = (url) => {
    setImg(url);
  };
  const handleDesc = (content) => {
    setDesc(content);
  };
  const onSubmit = (data) => {
    // console.log(data);
    // console.log(desc);
    // console.log(img);
    const newdata={...data}
    if(img!==''){
      newdata['image']=img
    }
    if(desc!==''){
      newdata['description']=desc
    }
    dispatch(createProduct(newdata))
  };
  return (
    <div className="container">
      <div className="create-product">
        <div className="create-title">Thêm sản phẩm mới</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-input">
            <label htmlFor="name" className="form-label">
              Tên sản phẩm
            </label>
            <input
              type="name"
              name="name"
              {...register("name", {
                required: true,
              })}
            />
          </div>
          <div className="row">
            <div className="col c-6 pr-20">
              <div className="form-input">
                <label htmlFor="price" className="form-label">
                  Giá
                </label>
                <input
                  type="number"
                  name="price"
                  {...register("price", {
                    required: true,
                  })}
                />
              </div>
            </div>
            <div className="col c-6 pl-20">
              <div className="form-input">
                <label htmlFor="quantity" className="form-label">
                  Số lượng
                </label>
                <input
                  type="number"
                  name="quantity"
                  {...register("quantity")}
                />
              </div>
            </div>
          </div>
          <div className="col c-6 ">
            <div className="form-select">
              <label htmlFor="category" className="form-label">
                Danh mục
              </label>
              <select
                name="category"
                {...register("category", {
                  required: true,
                })}
              >
                {categorys ? (
                  categorys.map((item, index) => (
                    <option value={item._id} key={index}>
                      {item.name}
                    </option>
                  ))
                ) : (
                  <></>
                )}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col c-6 pr-20">
              <div className="form-select">
                <label htmlFor="author" className="form-label">
                  Tác giả
                </label>
                <select
                  name="author"
                  {...register("author", {
                    required: true,
                  })}
                >
                  {authors ? (
                    authors.map((item, index) => (
                      <option value={item._id} key={index}>
                        {item.name}
                      </option>
                    ))
                  ) : (
                    <></>
                  )}
                </select>
              </div>
            </div>
            <div className="col c-6 pl-20">
              <div className="form-select">
                <label htmlFor="publisher" className="form-label">
                  Nhà xuất bản
                </label>
                <select
                  name="publisher"
                  {...register("publisher", {
                    required: true,
                  })}
                >
                  {publishers ? (
                    publishers.map((item, index) => (
                      <option value={item._id} key={index}>
                        {item.name}
                      </option>
                    ))
                  ) : (
                    <></>
                  )}
                </select>
              </div>
            </div>
          </div>
          <UpLoadImage img={img} changeImg={changeImg} />
          <label htmlFor="publisher" className="form-label">
            Mô tả sản phẩm
          </label>
          <TextEditer handleDesc={handleDesc} />
          <div className="submit-area">
            <button type="submit" className="btn btn--border-none">
              Thêm sản phẩm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
