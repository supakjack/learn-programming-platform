import todos from "./todos/index";
import user from "./user/index";
import problem from "./problem/index";
import course from "./course/index";
import breadcrumb from "./breadcrumb/index";

export const state = () => ({
  counter: 0
});

export const mutations = {
  setCounter(state, counter) {
    state.counter = counter;
  }
};

export const actions = {
  increment(context) {
    context.commit("setCounter", context.state.counter + 1);
  }
};

export const getters = {
  getOne(state) {
    return state.counter + 1;
  }
};

export const modules = {
  todos,
  user,
  problem,
  course,
  breadcrumb
};
