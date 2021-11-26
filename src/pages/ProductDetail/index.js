import React, { useEffect, useState } from "react";
import "./style.scss";
import Review from "./item/Review";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { createProductReview, listProductDetails } from "../../actions/productAction";
import { addToCart } from "../../actions/cartAction";
import { priceToString } from "../../common/convertNumberToPrice";
export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);

  const id = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    review: reviewcreate
  } = productReviewCreate;

  useEffect(() => {
    dispatch(listProductDetails(id.productID));
    // console.log(JSON.stringify(product))
  }, [successCreate]);

  const changeQuantity = (payload) => {
    if ((quantity + payload > 0) & (quantity + payload <= product.quantity)) {
      setQuantity(quantity + payload);
    }
  };
  const addCart = () => {
    dispatch(addToCart(product._id, quantity));
  };

  const createReview = (review) => {
    dispatch(createProductReview(product._id, review))
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col c-6 md-12 padding">
          <div className="product-image">
            <img src={product ? product.image : ''} alt="" />
          </div>
        </div>
        <div className="col c-6 md-12 padding">
          <div className="product-infor">
            <div className="product-name">{product ? product.name : ''}</div>
            <div className="product-publisher">
              Nhà cung cấp: {product && product.publisher ? product.publisher.name : ''}
            </div>
            <div className="product-author">
              Tác giả: {product && product.authors ? product.authors.name : ''}
            </div>
            <div className="product-price">{priceToString(product?.price || 0)}</div>
            <div className="purchase">
              <div className="number">
                <div className="minus" onClick={() => changeQuantity(-1)}>
                  <i class="fas fa-minus"></i>
                </div>
                <input
                  type="text"
                  disabled
                  className="product-number"
                  value={quantity}
                />
                <div className="plus" onClick={() => changeQuantity(+1)}>
                  <i class="fas fa-plus"></i>
                </div>
              </div>
            </div>
            <button onClick={addCart} className="btn">
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="product-desc">
          <h3 className="desc-title">Mô Tả Sản Phẩm</h3>
          <p>{product ? product.description : ''}</p>
        </div>
      </div>
      <Review reviews={product ? product.reviews : []} createReview={createReview} />
    </div>
  );

}
