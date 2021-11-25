import React, { useEffect, useState } from "react";
import "./style.scss";
import { useForm } from "react-hook-form";
import TextEditer from "../../../components/TextEditer";
import UpLoadImage from "../../../components/UpLoadImage";
import { useDispatch, useSelector } from "react-redux";
import { listAuthors } from "../../../actions/authorAction";
import { listCategorys } from "../../../actions/categoryAction";
import { listPublishers } from "../../../actions/publisherAction";
import { listProductDetails } from "../../../actions/productAction";
import { useParams } from "react-router";
export default function EditProduct() {
  const id = useParams();

  const dispatch = useDispatch();
  const authorList = useSelector((state) => state.authorList);
  const { authors } = authorList;

  const categoryList = useSelector((state) => state.categoryList);
  const { categorys } = categoryList;

  const publisherList = useSelector((state) => state.publisherList);
  const { publishers } = publisherList;

  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;

  useEffect(() => {
    dispatch(listAuthors());
    dispatch(listCategorys());
    dispatch(listPublishers());
    dispatch(listProductDetails(id.productId));

    
  }, []);
 
  const { handleSubmit, register } = useForm({defaultValues:product});
  // const initContent = "fasdfs";
  const [desc, setDesc] = useState("");
  const handleDesc = (content) => {
    setDesc(content);
  };
  const onSubmit = (data) => {
    console.log(data);
    // console.log(desc);
    // console.log(product)
  };

  return (
    <div className="container">
      <div className="create-product">
        <div className="create-title">Sửa thông tin sản phẩm</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-input">
            <label htmlFor="name" className="form-label">
              Tên sản phẩm
            </label>
            <input
              type="name"
              value={product ? product.name : ""}
              name="name"
              {...register("name")}
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
                  value={product ? product.price : ""}
                  name="price"
                  {...register("price")}
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
                  value={product ? product.quantity : ""}
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
                <select name="category" {...register("category")}>
                  {categorys.map((item, index) =>(
                      <option selected={product&&product.category===item._id} value={item._id} key={index}>
                        {item.name}
                      </option>
                    )
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
                <select name="author" {...register("author")}>
                  {authors.map((item, index) => (
                    <option selected={product&&product.author===item._id} value={item._id} key={index}>
                      {item.name}
                    </option>
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
                  {publishers.map((item, index) => (
                    <option selected={product&&product.publisherId===item._id} value={item._id} key={index}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <UpLoadImage />
          <label htmlFor="publisher" className="form-label">
            Mô tả sản phẩm
          </label>
          <TextEditer handleDesc={handleDesc} initialContent={product ? product.description : ""} />
          <div className="submit-area">
            <button type="submit" className="btn btn--border-none">
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
