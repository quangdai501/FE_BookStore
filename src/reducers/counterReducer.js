import { INCREASE, DECREASE } from "../constants/counter";

const counterReducer = (state = { counter: 1 }, action) => {
  switch (action.type) {
    case INCREASE:
      return { ...state, counter: state.counter + 1 };

    case DECREASE:
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
};
export default counterReducer;
