import "./style.scss";
import SwiperProduct from "./items/SwiperProduct";
import { useState } from "react";
import SwpiperBanner from "./items/SwiperBanner";
import { useNavigate } from "react-router";

export default function Home() {
  const features = ["Đặc sắc", "Mua nhiều", "Giảm giá"];
  const [feature, setFeature] = useState(0);

  const newProucts = { size: 6, sort: "-createdAt" };
  const saleProducts = { size: 6, sort: "price" };
  const sellProducts = { size: 6, sort: "-quantity" };
  const navigate = useNavigate();
  const gotoShop = (query) => {
    navigate({
      pathname: '/shop',
      search: `?sort=${query.sort}`,
    });
  }
  return (
    <div className="space">
      <div className="tab">
        <SwpiperBanner />
      </div>
      <div className="tab">
        <div className="tab__header row">
          <h2 className="c-6">Mới ra mắt</h2>
          <div className="c-6 more" >
            <div className="" onClick={() => gotoShop(newProucts)}>
              <span>Xem thêm</span>
              <i class="fas fa-angle-right"></i>
            </div>
          </div>
        </div>

        <SwiperProduct query={newProucts} />
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

        <SwiperProduct query={saleProducts} />
        <div className="more" onClick={() => gotoShop(saleProducts)}>
          <div className="">
            <span>Xem thêm</span>
            <i class="fas fa-angle-right"></i>
          </div>
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

        <SwiperProduct query={sellProducts} />
        <div className="more" onClick={() => gotoShop(sellProducts)}>
          <span>Xem thêm</span>
          <i class="fas fa-angle-right"></i>
        </div>
      </div>
    </div >
  );
}
