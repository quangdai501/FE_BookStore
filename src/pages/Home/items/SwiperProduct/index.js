import React, { useRef } from 'react'
import './style.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
    Navigation
} from 'swiper';
import 'swiper/swiper-bundle.min.css';
import Product from '../../../../components/Product';

SwiperCore.use([Navigation]);
export default function SwiperProduct() {
    const swiperRef = useRef(false);
    return (
        <Swiper
            navigation={true}
            ref={swiperRef}
            breakpoints={
                {
                    "922": {
                        "slidesPerView": 4,

                    },
                    "763": {
                        "slidesPerView": 3,
                    },
                    "200": {
                        "slidesPerView": 2,
                    }
                }
            }
            className="product-swiper"
        >
            {[1, 2, 3, 4, 5, 6].map((item) => (
                <SwiperSlide className="swiper-item" key={item}>
                    <Product
                        imageURL={"./images/img1.jpg"}
                        name={
                            "Think Like a Monk: Train Your Mind for Peace and Purpose of your life"
                        }
                        price={20000}
                        author={"Author"}
                        publisher={"Publisher"}
                    />
                </SwiperSlide>
            ))
            }
        </Swiper>
    )
}
