import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import './style.scss';
import SwiperCore, {
    Navigation
} from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation';
import Product from '../../../../components/Product';

SwiperCore.use([Navigation]);
export default function SwiperProduct() {
    const prevRef = useRef(null);
    const nextRef = useRef(null)
    const swiperRef = useRef(false);
    return (
        <Swiper
            navigation={{
                nextEl: nextRef.current,
                prevEl: prevRef.current
            }}
            onInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.destroy();
                swiper.navigation.update();
            }}
            slidesPerView={2}
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
            <div ref={prevRef} className="swiper-button-prev"><i class="fa fa-angle-left"></i></div>
            <div ref={nextRef} className="swiper-button-next"><i class="fa fa-angle-right"></i></div>
        </Swiper>
    )
}
