import React, { useEffect, useState } from "react";
import "./style.scss";
import Review from "./item/Review";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../../actions/productAction";
import { addToCart } from "../../actions/cartAction";
export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);

  const id = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id.productID));
    // console.log(JSON.stringify(product))
  }, []);

  const changeQuantity = (payload) => {
    if ((quantity + payload > 0) & (quantity + payload <= product.quantity)) {
      setQuantity(quantity + payload);
    }
  };
  const addCart = () => {
    dispatch(addToCart(product._id, quantity));
  };
  
    return (  
      <div className="container">
        <div className="row">
          <div className="col c-6 md-12 padding">
            <div className="product-image">
              <img src={product.image} alt="" />
            </div>
          </div>
          <div className="col c-6 md-12 padding">
            <div className="product-infor">
              <div className="product-name">{product.name}</div>
              <div className="product-publisher">
                Nhà cung cấp: {product.publisher?product.publisher.name:''}
              </div>
              <div className="product-author">
                Tác giả: {product.authors?product.authors.name:''}
              </div>
              <div className="product-price">{product.price}</div>
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
            <p>{product.description}</p>
          </div>
        </div>
        <Review />
      </div>
    );
  
}
