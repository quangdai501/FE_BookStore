import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import { counterIncrease, counterDecrease } from "../../actions/counterAction";
// import { useState } from "react";
// import counterDecrease from ;
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
    <div className="home-div">
      <p>{counter}</p>
      <button onClick={increase}>Increase</button>
      <button onClick={decrease}>Decrease</button>
    </div>
  );
}
