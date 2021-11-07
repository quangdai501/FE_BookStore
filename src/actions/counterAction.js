import { INCREASE, DECREASE } from "../constants/counter";

const counterIncrease = () => async (dispatch) => {
  try {
    dispatch({ type: INCREASE });
  } catch (error) {
    //dispatch faile action
  }
};
const counterDecrease = () => async (dispatch) => {
  try {
    dispatch({ type: DECREASE });
  } catch (error) {}
};
export { counterDecrease, counterIncrease };
