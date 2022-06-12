import React, { useEffect, useState, useRef } from "react";
import "./style.scss";
import Review from "./item/Review";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { createProductReview, listProductDetails } from "../../actions/productAction";
import { addToCart } from "../../actions/cartAction";
import { priceToString } from "../../common/convertNumberToPrice";
import Loading from '../../components/Loading'
import SwiperProduct from "./item/SwiperProduct";

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const descRef = useRef('');

  const {productID} = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading } = productDetails;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    review: reviewcreate
  } = productReviewCreate;
  
  useEffect(() => {
    descRef.current.innerHTML = product.description || '';
  }, [successCreate, product])

  useEffect(() => {
    dispatch(listProductDetails(productID));
  console.log('run');
  }, [successCreate, productID]);

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
    <div className="space">
      {loading && <Loading />}
      <div className="row gutter">
        <div className="c-6 md-12 padding ">
          <div className="product-image">
            <img src={product ? product.image : ''} alt="" />
          </div>
        </div>
        <div className="c-6 md-12 padding">
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
            <button onClick={addCart} className="btn btn--border-none">
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="c-12 product-desc">
          <div className="desc-header">
            <h3 className="desc-header__title">Mô Tả Sản Phẩm</h3>
          </div>
          <p ref={descRef}></p>
        </div>
      </div>
      <Review reviews={product ? product.reviews : []} createReview={createReview} loading={loadingCreate} />
      <div className="row">
        <div className="c-12 product-desc">
          <h3 className="desc-title">Sản phẩm liên quan</h3>
          <SwiperProduct id={productID} />
        </div>
      </div>
    </div>
  );
}
