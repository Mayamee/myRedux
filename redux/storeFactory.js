import { mergeDeep } from "./helpers/merge.js";
export default (reducer) => {
  let state = reducer({}, { type: "__INIT__" });
  const subscribers = [];
  return {
    dispatch: (action) => {
      const update = reducer(state, action);
      state = mergeDeep(state, update);
      subscribers.forEach((subscriber) => {
        subscriber.update(state);
      });
    },
    subscribe: (...subs) => {
      subscribers.push(...subs);
    },
    getState: () => state,
    removeAllSubs: (name) => {
      Array.prototype.findAllIndexes = function (executor) {
        const indexes = [];
        for (let index = 0; index < this.length; index++) {
          if (executor(this[index], index, this)) indexes.push(index);
        }
        return indexes;
      };
      subscribers
        .findAllIndexes((sub) => sub.name === name)
        .forEach((index, i) => {
          subscribers.splice(index - i, 1);
        });
    },
    removeSubs: (name, amount = 1, order = "stack") => {
      Array.prototype.findLastIndex = function (executor) {
        for (let index = this.length - 1; index >= 0; index--) {
          if (executor(this[index], index, this)) return index;
        }
        return -1;
      };
      for (let i = 0; i < amount; i++) {
        let index = -1;
        order === "queue" &&
          (index = subscribers.findIndex((sub) => sub.name === name));
        order === "stack" &&
          (index = subscribers.findLastIndex((sub) => sub.name === name));
        if (index === -1) return;
        subscribers.splice(index, 1);
      }
    },

    getSubs: () => subscribers,
  };
};
