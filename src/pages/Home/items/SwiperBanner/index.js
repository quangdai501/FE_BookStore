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
                                <p class="btn btn--fadeIn btn--bg-white">Khám phá</p>
                            </Link>
                        </div>
                        <div class="c-5 lg-5 md-12 hero-right"><img src="/images/img4.jpg" alt="Book" /></div>
                    </div>
                </SwiperSlide>
            ))
            }
        </Swiper>
    )
}
