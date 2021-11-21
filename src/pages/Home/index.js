import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import { counterIncrease, counterDecrease } from "../../actions/counterAction";
import Product from "../../components/Product";
import { useState } from "react";

export default function Home() {
  const { counter } = useSelector((state) => state.counter);
  const features = ["Đặc sắc", "Giảm giá", "Mua nhiều"];
  const [feature, setFeature] = useState(0);
  const changeFeature = (index) => setFeature(index);
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
        <div className="tab__header row">
          <h2>Mới ra mắt</h2>
          <a href="#">
            <span>Xem thêm</span>
            <i class="fas fa-greater-than"></i>
          </a>
        </div>

        <div className="row">
          {[1, 2, 3, 4].map((item, index) => (
            <div className="col c-3 lg-4 md-6 ">
              <Product
                imageURL={"./images/img1.jpg"}
                name={
                  "Think Like a Monk: Train Your Mind for Peace and Purpose of your life"
                }
                price={20000}
                author={"Author"}
                publisher={"Publisher"}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="tab">
        <div className="tab__header row">
          <h2>Đặc sắc</h2>
          <ul className="feature">
            {features.map((item, index) => (
              <li
                onClick={() => changeFeature(index)}
                className={index == feature ? "feature--active" : ""}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="row">
          {[1, 2, 3, 4].map((item, index) => (
            <div className="col c-3 lg-4 md-6 ">
              <Product
                imageURL={"./images/img1.jpg"}
                name={
                  "Think Like a Monk: Train Your Mind for Peace and Purpose of your life"
                }
                price={20000}
                author={"Author"}
                publisher={"Publisher"}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="tab">
        <div className="tab__header reverse">
          <h2>Đặc sắc</h2>
          <ul className="feature">
            {features.map((item, index) => (
              <li
                onClick={() => changeFeature(index)}
                className={index == feature ? "feature--active" : ""}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="row">
          {[1, 2, 3, 4].map((item, index) => (
            <div className="col c-3 lg-4 md-6 ">
              <Product
                imageURL={"./images/img1.jpg"}
                name={
                  "Think Like a Monk: Train Your Mind for Peace and Purpose of your life"
                }
                price={20000}
                author={"Author"}
                publisher={"Publisher"}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
