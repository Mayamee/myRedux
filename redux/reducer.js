import { DECREMENT, INCREMENT } from "./types.js";
const initState = {
  counter: 0,
};

export function reducer(state = initState, action) {
  if (action.type === "__INIT__") {
    return initState;
  }
  if (action.type === INCREMENT) {
    return {
      ...state,
      counter: state.counter + 1,
    };
  }
  if (action.type === DECREMENT) {
    return {
      ...state,
      counter: state.counter - 1,
    };
  }
  return state;
}
