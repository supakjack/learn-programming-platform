import todos from "./todos/index";
import user from "./user/index";
import problem from "./problem/index";
import homework from "./homework/index";
import course from "./course/index";
import breadcrumb from "./breadcrumb/index";

export const state = () => ({
  counter: 0,
  crumbs: [
    {
      title: "",
      url: ""
    }
  ]
});

export const mutations = {
  setCounter(state, counter) {
    state.counter = counter;
  },
  setCrumbs(state, crumbs) {
    state.crumbs = crumbs;
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
  homework,
  course,
  breadcrumb
};
