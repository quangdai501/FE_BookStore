import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import SwiperProduct from "./items/SwiperProduct";
import { useState } from "react";
import SwpiperBanner from "./items/SwiperBanner";
export default function Home() {

  const features = ["Đặc sắc", "Mua nhiều", "Giảm giá"];
  const [feature, setFeature] = useState(0);

  const dispatch = useDispatch();
  return (
    <div className="space">
      <div className="tab">
        <SwpiperBanner />
      </div>
      <div className="tab">
        <SwiperProduct />
      </div>
      <div className="tab">
        <div className="tab__header row">
          <h2>Mới ra mắt</h2>
          <div className="more">
            <a href="/#">
              <span>Xem thêm</span>
              <i class="fas fa-greater-than"></i>
            </a>
          </div>
        </div>

        <SwiperProduct />
      </div>
      <div className="tab">
        <div className="tab__header row">
          <h2>Đặc sắc</h2>
          <ul className="feature">
            {features.map((item, index) => (
              <li
                onClick={() => setFeature(index)}
                className={index === feature ? "feature--active" : ""}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <SwiperProduct />
        <div className="more">
          <a href="/#">
            <span>Xem thêm</span>
            <i class="fas fa-greater-than"></i>
          </a>
        </div>
      </div>
      <div className="tab">
        <div className="tab__header reverse">
          <h2>Đặc sắc</h2>
          <ul className="feature">
            {features.map((item, index) => (
              <li
                onClick={() => setFeature(index)}
                className={index === feature ? "feature--active" : ""}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <SwiperProduct />
        <div className="more">
          <a href="/#">
            <span>Xem thêm</span>
            <i class="fas fa-greater-than"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
