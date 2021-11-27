import React, { useRef } from 'react';
import './style.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
    Navigation, Pagination, Autoplay
} from 'swiper';
import { Link } from 'react-router-dom';
import 'swiper/swiper-bundle.min.css';
import 'swiper'
import 'swiper/components/navigation';
SwiperCore.use([Navigation, Pagination, Autoplay]);
export default function SwpiperBanner() {
    const swiperRef = useRef(null);

    return (
        <Swiper
            navigation
            slidesPerView={1}
            ref={swiperRef}
            pagination={true}
            autoplay={{ delay: 5000 }}
            className="banner-swiper"
        >
            {[1, 2, 3].map((item) => (
                <SwiperSlide className="swiper-item" key={item}>
                    <div class="row hero-item">
                        <div class="c-7 lg-7 md-12 hero-left">
                            <h4 class="item-pretitle">
                                Bán chạy nhất tháng
                            </h4>
                            <p class="item-title">
                                <span class="item-title__above">Sách nổi bật của</span>
                                <span class="item-title__below">Tháng 12</span>
                            </p>
                            <Link to="/shop">
                                <p class="btn btn--fadeIn">Khám phá</p>
                            </Link>
                        </div>
                        <div class="c-5 lg-5 md-12 hero-right"><img src="https://www.vinabook.com/images/thumbnails/product/240x/364602_p93100mcdaa4509b8a65ba0278012629aca6183.jpg" alt="Book" srcset="" /></div>
                    </div>
                </SwiperSlide>
            ))
            }
        </Swiper>
    )
}
