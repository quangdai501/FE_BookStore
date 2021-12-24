import React, { useRef, useState, useEffect } from 'react'
import './style.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Navigation
} from 'swiper';
import 'swiper/swiper-bundle.min.css';
import Product from '../../../../components/Product';
import ProductApi from "../../../../api/productApi";

SwiperCore.use([Navigation]);
export default function SwiperProduct(props) {
  const { query } = props
  const swiperRef = useRef(false);

  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ProductApi.getAll(query)
        setProducts(result.data.product);
      } catch (error) {
      }
    };
    fetchData();
  }, []);

  return (
    <Swiper
      navigation={true}
      ref={swiperRef}
      breakpoints={{
        992: {
          slidesPerView: 5,
        },
        763: {
          slidesPerView: 3,
          navigation: false
        },
        200: {
          slidesPerView: 2,
        },
      }}
      className="product-swiper"
    >
      {products ? (
        products.map((item, index) => (
          <SwiperSlide className="swiper-item" key={index}>
            <Product
              imageURL={item.image}
              name={item.name}
              price={item.price}
              author={item.authors.name}
              publisher={item.publisher.name}
              productId={item._id}
            />
          </SwiperSlide>
        ))
      ) : (
        <></>
      )}
    </Swiper>
  );
}
