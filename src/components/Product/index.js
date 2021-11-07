import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
Product.propTypes = {
  imageURL: PropTypes.string.isRequired,
  publisher: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
export default function Product(props) {
  return (
    <div class="product">
      <div class="product-img">
        <img src={props.imageURL} alt="" />
      </div>
      <div class="product-info">
        <p class="product-info__company">{props.publisher}</p>
        <h4 class="product-info__name">{props.name}</h4>
        <a class="product-info__author" href="/#">
          {props.author}
        </a>
        <p class="product-info__price">{props.price}</p>
      </div>
      <div class="action">
        <p class="btn--add-to-cart">Add to cart</p>
      </div>
    </div>
  );
}
