import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import { counterIncrease, counterDecrease } from "../../actions/counterAction";
import Product from "../../components/Product";
import SwiperProduct from "./items/SwiperProduct";
import { useState } from "react";
export default function Home() {
  const { counter } = useSelector((state) => state.counter);

  const features = ["Đặc sắc", "Mua nhiều", "Giảm giá"];
  const [feature, setFeature] = useState(0);

  console.log(counter);
  const dispatch = useDispatch();
  function increase() {
    dispatch(counterIncrease());
  }
  function decrease() {
    dispatch(counterDecrease());
  }

  return (
    <>
      <div className="home-div">
        <p>{counter}</p>
        <button onClick={increase}>Increase</button>
        <button onClick={decrease}>Decrease</button>
      </div>
      <div className="tab">
        <SwiperProduct />
      </div>
      <div className="tab">
        <div className="tab__header row">
          <h2>Mới ra mắt</h2>
          <div className="more">
            <a href="#">
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
          <a href="#">
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
          <a href="#">
            <span>Xem thêm</span>
            <i class="fas fa-greater-than"></i>
          </a>
        </div>
      </div>
    </>
  );
}
