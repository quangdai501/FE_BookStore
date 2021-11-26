import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { useDispatch } from "react-redux";
import { addToCart } from '../../actions/cartAction'
import { useNavigate } from "react-router";
import { priceToString } from "../../common/convertNumberToPrice";
Product.propTypes = {
  imageURL: PropTypes.string.isRequired,
  publisher: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
export default function Product(props) {
  const dispatch = useDispatch()
  const addtoCart=(e)=>{
    e.stopPropagation()
    if (props.productId) {
      dispatch(addToCart(props.productId, 1))
    }
  }
  const navigate = useNavigate();
  const gotoProductDetail=()=>{
    navigate({
      pathname: `/product-detail/${props.productId}`,
    });
  }
  return (
    <div class="product" onClick={gotoProductDetail}>
      <div class="product-img">
        <img src={props.imageURL} alt="" />
      </div>
      <div class="product-info">
        <p class="product-info__company">{props.publisher}</p>
        <h4 class="product-info__name">{props.name}</h4>
        <a class="product-info__author" href="/#">
          {props.author}
        </a>
        <p class="product-info__price">{priceToString(props.price)}</p>
      </div>
      <div class="action" onClick={addtoCart}>
        <p class="btn--add-to-cart">Add to cart</p>
      </div>
    </div>
  );
}
