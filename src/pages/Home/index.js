import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import { counterIncrease, counterDecrease } from "../../actions/counterAction";
import Product from "../../components/Product";

export default function Home() {
  const { counter } = useSelector((state) => state.counter);

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

      <div className="row">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
          <div className="col c-2-5">
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
    </>
  );
}
