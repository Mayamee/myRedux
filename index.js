import { decrement, increment } from "./redux/actionCreators.js";
import { reducer } from "./redux/reducer.js";
import createStore from "./redux/storeFactory.js";

const subCreator = (name, update) => ({
  name,
  update,
});

const store = createStore(reducer);

const obj = { counter: 0 };
const sub = subCreator("s0", (state) => {
  obj.counter = state.counter;
  console.log({ obj });
});

store.subscribe(sub);
store.dispatch(increment());
store.dispatch(decrement());
