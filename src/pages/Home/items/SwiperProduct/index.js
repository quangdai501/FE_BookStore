import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./style.scss";
import SwiperCore, { Navigation } from "swiper";
import "swiper/swiper.min.css";
import "swiper/components/navigation";
import Product from "../../../../components/Product";
import ProductApi from "../../../../api/productApi";

SwiperCore.use([Navigation]);
export default function SwiperProduct(props) {
    const {query}=props
  const prevRef = useRef(null);
  const nextRef = useRef(null);
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
      navigation={{
        nextEl: nextRef.current,
        prevEl: prevRef.current,
      }}
      onInit={(swiper) => {
        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;
        swiper.navigation.destroy();
        swiper.navigation.update();
      }}
      slidesPerView={2}
      ref={swiperRef}
      breakpoints={{
        922: {
          slidesPerView: 4,
        },
        763: {
          slidesPerView: 3,
        },
        200: {
          slidesPerView: 2,
        },
      }}
      className="product-swiper"
    >
      {products ? (
        products.map((item,index) => (
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
      <div ref={prevRef} className="swiper-button-prev">
        <i class="fa fa-angle-left"></i>
      </div>
      <div ref={nextRef} className="swiper-button-next">
        <i class="fa fa-angle-right"></i>
      </div>
    </Swiper>
  );
}
