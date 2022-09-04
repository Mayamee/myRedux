import { DECREMENT, INCREMENT } from "./types.js";

export const increment = () => ({
  type: INCREMENT,
});

export const decrement = () => ({
  type: DECREMENT,
});
